import PageHeader from "../../components/PAGhkjf/page-hero";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TripCard from "../../components/TripCard";
import { useCompanies, useTrips } from "../../hooks/useTrips";
import { FiltersSidebar } from "../../components/FiltersSidebar";
import { CompanySelector } from "../../components/CompanySelector";
import TripSearchForm from "../../search/TripSearchForm";

export const Book = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // جلب معلمات البحث من الـ URL (مع وضع قيم افتراضية في حال لم تكن موجودة)
  const originId = searchParams.get('originId') || '';
  const destinationId = searchParams.get('destinationId') || '';
  const date = searchParams.get('date') || '';

  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('all');

  // جلب كل الشركات المتاحة
  const { data: companiesData } = useCompanies();
  const companies = companiesData || [];

  // تجهيز الفلاتر لإرسالها للـ API الخاص بالرحلات (/website/trips)
  const queryFilters = useMemo(() => {
    const filters = {};
    if (originId) filters.originId = originId;
    if (destinationId) filters.destinationId = destinationId;
    if (date) filters.date = date;
    if (selectedCompanyId !== null && selectedCompanyId !== 'all') {
      filters.companyId = selectedCompanyId;
    }
    return filters;
  }, [originId, destinationId, date, selectedCompanyId]);

  // جلب الرحلات من الـ API اعتماداً على معلمات البحث والشركة
  const { data: tripsData, isPending: isTripsLoading } = useTrips(queryFilters);
  const trips = tripsData || [];

  // فلترة إضافية حسب الوقت (صباحاً، ظهراً، مساءً) في الواجهة الأمامية
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      if (selectedTimeSlot === 'all') return true;

      const timeString = trip.departureAt || trip.departureTime;
      if (!timeString) return true;

      const hour = new Date(timeString).getHours();
      if (selectedTimeSlot === 'morning') return hour < 12;
      if (selectedTimeSlot === 'afternoon') return hour >= 12 && hour < 17;
      if (selectedTimeSlot === 'evening') return hour >= 17;

      return true;
    });
  }, [trips, selectedTimeSlot]);

  return (
    <section className="container py-8">
      <PageHeader
        showArch={true}
        archPosition="left"
        breadcrumb={[{ name: "الرئيسية", path: "/" }, { name: "نتائج البحث" }]}
        badgeText="لتكمل الطريق"
        title="اختار الرحلة اللي"
        titleHighlight="بتشبهك."
        description="قارن بين الشركات والأوقات، واحجز مقعدك بكل سهولة."
      />
      
      {/* نموذج البحث المحدث لتحديث رابط الـ URL ومعلمات البحث */}
      <TripSearchForm />

      <div className="max-w-7xl mx-auto px-4 py-8 font-cairo" dir="rtl">
        <CompanySelector
          companies={companies}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={setSelectedCompanyId}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FiltersSidebar
              companies={companies}
              selectedCompanyId={selectedCompanyId}
              onSelectCompany={setSelectedCompanyId}
              selectedTimeSlot={selectedTimeSlot}
              onSelectTimeSlot={setSelectedTimeSlot}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4 text-sm font-bold text-slate-700">
              {filteredTrips.length} رحلات متاحة
            </div>

            {isTripsLoading ? (
              <div className="text-center py-12 text-slate-400 font-medium">جاري تحميل الرحلات من السيرفر...</div>
            ) : filteredTrips.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-100 shadow-sm">
                لا توجد رحلات مطابقة للفلتر المحدد.
              </div>
            ) : (
              filteredTrips.map((trip) => (
<TripCard
  key={trip.id}
  trip={trip}
  onSelectSeats={() => {
    // جلب عدد المسافرين من الـ URL أو افتراضياً 1
    const searchParams = new URLSearchParams(window.location.search);
    const passengersCount = searchParams.get('passengers') || 1;

    navigate(`/book/seats/${trip.id}`, { 
      state: { 
        trip, 
        passengers: Number(passengersCount) 
      } 
    });
  }}
/>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;