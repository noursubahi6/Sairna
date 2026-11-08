import TripSearchForm from "../../search/TripSearchForm";
import PageHeader from "../../components/PAGhkjf/page-hero";
import { useState } from "react";
import { CheckCircle2, RotateCcw, SlidersHorizontal } from "lucide-react";
import TripCard from "../../components/TripCard/TripCard";
import { useTrips } from "../../hooks/useTrips";

function Book() {
  const [filters, setFilters] = useState({
    originId: 2,
    destinationId: 1,
    date: "2026-11-05",
  });
  const handleSearch = (searchData) => {
    console.log("بحث الرئيسية:", searchData);
  };
  const { data: trips, isLoading, isError, error } = useTrips(filters);
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
      <TripSearchForm onSearch={handleSearch} showTitleSection={false} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        {/* قائمة الرحلات (يسار/يمين حسب الترتيب) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-extrabold text-text">
              {trips ? `${trips.length || 1} رحلات متاحة` : "جاري البحث..."}
            </h2>
          </div>

          {isLoading && <div className="text-center py-12 text-muted font-bold">جاري تحميل الرحلات...</div>}
          {isError && <div className="text-center py-12 text-red-500 font-bold">{error?.message}</div>}

          {/* عرض الكروت */}
          {trips &&
            trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onSelectSeats={(id) => console.log(" الانتقال لاختيار مقاعد الرحلة رقم:", id)}
              />
            ))}
        </div>

        {/* السايدبار الجانبي للفلترة (Filters Sidebar) */}
        <div className="lg:col-span-1 bg-surface border border-border rounded-[24px] p-6 h-fit sticky top-6">
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <span className="flex items-center gap-2 text-xs font-black text-text">
              <SlidersHorizontal className="w-4 h-4 text-primary" /> تصفية النتائج
            </span>
            <button className="text-[11px] text-muted hover:text-primary flex items-center gap-1 font-bold transition-colors">
              <RotateCcw className="w-3 h-3" /> إعادة ضبط
            </button>
          </div>

          {/* فلتر الشركات */}
          <div className="mb-6">
            <h4 className="text-xs font-black text-text mb-3">شركة النقل</h4>
            <div className="flex flex-col gap-2 text-xs text-muted font-bold">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2">
                  <input type="radio" name="company" defaultChecked className="accent-primary" /> كل الشركات
                </span>
                <span className="bg-surface-alt px-2 py-0.5 rounded-full text-[10px]">6</span>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2">
                  <input type="radio" name="company" className="accent-primary" /> الشام للنقل
                </span>
                <span className="bg-surface-alt px-2 py-0.5 rounded-full text-[10px]">2</span>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2">
                  <input type="radio" name="company" className="accent-primary" /> الفرات للسياحة
                </span>
                <span className="bg-surface-alt px-2 py-0.5 rounded-full text-[10px]">2</span>
              </label>
            </div>
          </div>

          {/* شارة الأمان */}
          <div className="bg-soft-teal/50 border border-primary/20 rounded-2xl p-4 text-center">
            <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
            <h5 className="text-xs font-black text-text mb-1">الحجز بشكل واضح</h5>
            <p className="text-[10px] text-muted leading-relaxed">كل تفاصيل الرحلة أمامك قبل التأكيد.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Book;
