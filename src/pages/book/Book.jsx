import PageHeader from "../../components/PAGhkjf/page-hero";
import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TripCard from "../../components/TripCard";
import { useCompanies, useTrips } from "../../hooks/useTrips";
import { useCities } from "../../hooks/useCities";
import { FiltersSidebar } from "../../components/FiltersSidebar";
import { CompanySelector } from "../../components/CompanySelector";
import TripSearchForm from "../../search/TripSearchForm";
import { ResultsHeader } from "../../components/ResultsHeader/ResultsHeader";
import { Bus } from "lucide-react";
import { useTripSearchStore } from "../../store/useTripSearchStore"; // 1. استيراد الستور

export const Book = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 2. جلب القيم ودوال التعديل من Zustand Store
  const {
    originId: storeOriginId,
    destinationId: storeDestinationId,
    tripDate: storeDate,
    passengers: storePassengers,
    setOriginId,
    setDestinationId,
    setTripDate,
    setPassengers,
  } = useTripSearchStore();

  // 3. الأولوية للـ URL إذا وجد، وإلا نأخذ القيمة المحفوظة في Zustand
  const originId = searchParams.get("originId") || storeOriginId;
  const destinationId = searchParams.get("destinationId") || storeDestinationId;
  const date = searchParams.get("date") || storeDate;
  const passengers = searchParams.get("passengers") || storePassengers || "1";

  // مزامنة الـ URL مع الستور في حال دخل المستخدم لرابط مباشر يحتوي على بارامترات
  useEffect(() => {
    if (searchParams.get("originId")) setOriginId(searchParams.get("originId"));
    if (searchParams.get("destinationId")) setDestinationId(searchParams.get("destinationId"));
    if (searchParams.get("date")) setTripDate(searchParams.get("date"));
    if (searchParams.get("passengers")) setPassengers(searchParams.get("passengers"));
  }, [searchParams, setOriginId, setDestinationId, setTripDate, setPassengers]);

  // جلب المدن لاستخراج أسماء المدن الحقيقية ديناميكياً
  const { data: citiesData } = useCities();
  const cities = citiesData || [];

  const originCityName = cities.find((c) => String(c.id) === String(originId))?.name || "اختر مدينة الانطلاق";
  const destinationCityName = cities.find((c) => String(c.id) === String(destinationId))?.name || "اختر مدينة الوصول";

  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("all");
  const [sortBy, setSortBy] = useState("departure");

  const { data: companiesData } = useCompanies();
  const companies = companiesData || [];

  const queryFilters = useMemo(() => {
    const filters = {};
    if (originId) filters.originId = originId;
    if (destinationId) filters.destinationId = destinationId;
    if (date) filters.date = date;
    if (selectedCompanyId !== null && selectedCompanyId !== "all") {
      filters.companyId = selectedCompanyId;
    }
    return filters;
  }, [originId, destinationId, date, selectedCompanyId]);

  const { data: tripsData, isPending: isTripsLoading } = useTrips(queryFilters);
  const trips = tripsData || [];

  const filteredAndSortedTrips = useMemo(() => {
    let result = trips.filter((trip) => {
      if (selectedTimeSlot === "all") return true;
      const timeString = trip.departureAt || trip.departureTime;
      if (!timeString) return true;

      const hour = new Date(timeString).getHours();
      if (selectedTimeSlot === "morning") return hour < 12;
      if (selectedTimeSlot === "afternoon") return hour >= 12 && hour < 17;
      if (selectedTimeSlot === "evening") return hour >= 17;

      return true;
    });

    result.sort((a, b) => {
      if (sortBy === "price") return (a.price || 0) - (b.price || 0);
      if (sortBy === "duration") return (a.durationMinutes || 0) - (b.durationMinutes || 0);
      const timeA = new Date(a.departureAt || a.departureTime || 0).getTime();
      const timeB = new Date(b.departureAt || b.departureTime || 0).getTime();
      return timeA - timeB;
    });

    return result;
  }, [trips, selectedTimeSlot, sortBy]);

  return (
    <>
      <div className="w-full border-b border-border bg-surface-alt pb-6" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6">
          <div className="flex-1">
            <PageHeader
              archPosition="left"
              breadcrumb={[{ name: "الرئيسية", path: "/" }, { name: "نتائج البحث" }]}
              badgeText="لتكمل الطريق"
              title="اختار الرحلة اللي"
              titleHighlight="بتشبهك."
              description="قارن بين الشركات والأوقات، واحجز مقعدك بكل سهولة."
            />
          </div>

          <div className="md:flex items-center justify-center pl-4 shrink-0">
            <Bus className="text-primary/25 w-24 h-24 -rotate-12" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 pb-12 font-cairo" dir="rtl">
        {/* الفورم هنا سيعرض تلقائياً نفس المدن والتاريخ وعدد المسافرين المحفوظة */}
        <div className="relative z-10 -mt-10 mb-8">
          <TripSearchForm showTitleSection={false} />
        </div>

        <CompanySelector selectedCompanyId={selectedCompanyId} onSelectCompany={setSelectedCompanyId} />

        <div className="py-2">
          <ResultsHeader
            tripsCount={filteredAndSortedTrips.length}
            fromCity={originCityName}
            toCity={destinationCityName}
            travelDate={date}
            passengersCount={Number(passengers)}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
          <div className="lg:col-span-1">
            <FiltersSidebar
              companies={companies}
              selectedCompanyId={selectedCompanyId}
              onSelectCompany={setSelectedCompanyId}
              selectedTimeSlot={selectedTimeSlot}
              onSelectTimeSlot={setSelectedTimeSlot}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            {isTripsLoading ? (
              <div className="text-center py-12 text-slate-400 font-medium">جاري تحميل الرحلات من السيرفر...</div>
            ) : filteredAndSortedTrips.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-100 shadow-sm">
                لا توجد رحلات مطابقة للفلتر المحدد.
              </div>
            ) : (
              filteredAndSortedTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onSelectSeats={() => {
                    // 4. تمرير عدد المسافرين مباشرة من المتغير الموحد دون الحاجة لقراءة window.location
                    navigate(`/book/seats/${trip.id}`, {
                      state: {
                        trip,
                        passengers: Number(passengers),
                      },
                    });
                  }}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;