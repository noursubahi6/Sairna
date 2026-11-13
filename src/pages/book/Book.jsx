import PageHeader from "../../components/PAGhkjf/page-hero";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TripCard from "../../components/TripCard";
import { useCompanies, useTrips } from "../../hooks/useTrips";
import { useCities } from "../../hooks/useCities";
import { FiltersSidebar } from "../../components/FiltersSidebar";
import { CompanySelector } from "../../components/CompanySelector";
import TripSearchForm from "../../search/TripSearchForm";
import { ResultsHeader } from "../../components/ResultsHeader/ResultsHeader";
import { Bus } from "lucide-react";

export const Book = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const originId = searchParams.get("originId") || "";
  const destinationId = searchParams.get("destinationId") || "";
  const date = searchParams.get("date") || "";
  const passengers = searchParams.get("passengers") || "1";

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

  const handleSearch = (searchData) => {
    console.log("بيانات البحث:", searchData);
  };

  return (
    <section className="container py-8">
  <div className="grid grid-cols-[1fr_auto] items-center ">
  {/* عمود النصوص (يأخذ المساحة المتاحة كاملة) */}
  <div>
    <PageHeader
      showArch={false}
      archPosition="left"
      breadcrumb={[{ name: "الرئيسية", path: "/" }, { name: "نتائج البحث" }]}
      badgeText="لتكمل الطريق"
      title="اختار الرحلة اللي"
      titleHighlight="بتشبهك."
      description="قارن بين الشركات والأوقات، واحجز مقعدك بكل سهولة."
    />
  </div>

  {/* عمود أيقونة الباص في أقصى اليسار */}
  <div className="">
    <Bus className="text-[#0bc7b7f1] w-20 h-20 -rotate-12" />
  </div>
</div>
      <TripSearchForm showTitleSection={false} onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 py-8 font-cairo" dir="rtl">
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
                    const currentParams = new URLSearchParams(window.location.search);
                    const passengersCount = currentParams.get("passengers") || 1;

                    navigate(`/book/seats/${trip.id}`, {
                      state: {
                        trip,
                        passengers: Number(passengersCount),
                      },
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
