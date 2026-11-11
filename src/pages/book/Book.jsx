import PageHeader from "../../components/PAGhkjf/page-hero";
import { useMemo, useState } from "react";
import TripCard from "../../components/TripCard";
import { useCompanies, useTrips } from "../../hooks/useTrips";
import { FiltersSidebar } from "../../components/FiltersSidebar";
import { CompanySelector } from "../../components/CompanySelector";

export const Book = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('all');

  // 1. جلب الشركات
  const { data: companiesData } = useCompanies();
  const companies = companiesData || [];

  // 2. جلب جميع الرحلات بدون إرسال باراميترات تسبب خطأ 400
  const { data: tripsData, isPending: isTripsLoading } = useTrips();
  const trips = tripsData || [];

  // 3. الفلترة المحلية المدمجة (للشركة + وقت الانطلاق) لتجنب أخطاء السيرفر
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      // فلترة الشركة
      if (selectedCompanyId !== null) {
        const tripCompId = trip.company?.id || trip.company_id;
        if (tripCompId !== selectedCompanyId) {
          return false;
        }
      }

      // فلترة أوقات الانطلاق
      if (selectedTimeSlot === 'all') return true;

      const timeString = trip.departureAt || trip.departureTime;
      if (!timeString) return true;

      const hour = new Date(timeString).getHours();

      if (selectedTimeSlot === 'morning') return hour < 12;
      if (selectedTimeSlot === 'afternoon') return hour >= 12 && hour < 17;
      if (selectedTimeSlot === 'evening') return hour >= 17;

      return true;
    });
  }, [trips, selectedCompanyId, selectedTimeSlot]);

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
              <div className="text-center py-12 text-slate-400 font-medium">جاري تحميل الرحلات...</div>
            ) : filteredTrips.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-100 shadow-sm">
                لا توجد رحلات مطابقة للفلتر المحدد.
              </div>
            ) : (
              filteredTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onSelectSeats={(id) => console.log('رحلة رقم:', id)}
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