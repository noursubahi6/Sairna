import { useState, useEffect } from "react";
import { MapPin, Calendar, Users, Search, ArrowRightLeft, Sparkles, Loader2 } from "lucide-react";
import { useCities } from "../hooks/useCities";
import Button from "../components/button/Button";

export default function TripSearchForm({
  onSearch,
  title = "وين رحلتك الجاية؟",
  subtitle = "اختار وجهتك وباقي التفاصيل علينا",
  badgeText = "الحجز بـ 3 خطوات",
  showTitleSection = true
}) {
  const { data: cities = [], isLoading } = useCities();

  const [fromCity, setFromCity] = useState("");                    
  const [toCity, setToCity] = useState("");
  const [tripDate, setTripDate] = useState("2026-11-06");
  const [passengers, setPassengers] = useState("1");

  useEffect(() => {
    if (cities.length > 1) {
      setFromCity(cities[0].name);
      setToCity(cities[1].name);
    }
  }, [cities]);

  const handleSwapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ fromCity, toCity, tripDate, passengers });
    }
  };

  return (
    <div
      className={`relative rounded-[21px] bg-surface border border-border shadow-[0_21px_58px_rgba(11,71,72,0.1)] font-cairo dir-rtl transition-all ${
        showTitleSection
          ? "p-5 md:p-[22px_24px_25px]"
          : "p-[18px]"
      }`}
      dir="rtl"
    >
      {/* الترويسة العلوية */}
      {showTitleSection && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <h3 className="text-base font-black text-text">{title}</h3>
            {subtitle && (
              <span className="text-xs text-muted font-bold hidden sm:inline">
                {subtitle}
              </span>
            )}
          </div>

          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-teal text-primary-deep text-xs font-bold">
              <span>{badgeText}</span>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
          )}
        </div>
      )}

      {/* النموذج الرئيسي للبحث */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_1fr_1fr_1.2fr] gap-2.5 items-end"
      >
        {/* 1. من وين؟ */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-[11px] font-bold text-muted mr-1">من وين؟</label>
          <div className="relative h-[60px] px-3.5 py-2.5 rounded-[11px] border border-border bg-surface flex items-center gap-2.5 focus-within:border-primary transition-colors">
            <MapPin className="w-5 h-5 text-primary shrink-0 pointer-events-none" />
            <div className="flex flex-col justify-center w-full min-w-0">
              {isLoading ? (
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span>جاري التحميل...</span>
                </div>
              ) : (
                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-extrabold text-text outline-none cursor-pointer appearance-none text-right truncate"
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.name} className="bg-surface text-text">
                      {city.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* زر التبديل بين المدينتين */}
        <div className="flex items-center justify-center self-end mb-1">
          <button
            type="button"
            onClick={handleSwapCities}
            aria-label="تبديل المحافظات"
            className="w-[38px] h-[38px] rounded-[10px] bg-soft-teal text-primary-deep flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 2. لوين؟ */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-[11px] font-bold text-muted mr-1">لوين؟</label>
          <div className="relative h-[60px] px-3.5 py-2.5 rounded-[11px] border border-border bg-surface flex items-center gap-2.5 focus-within:border-primary transition-colors">
            <MapPin className="w-5 h-5 text-primary shrink-0 pointer-events-none" />
            <div className="flex flex-col justify-center w-full min-w-0">
              {isLoading ? (
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span>جاري التحميل...</span>
                </div>
              ) : (
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-extrabold text-text outline-none cursor-pointer appearance-none text-right truncate"
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.name} className="bg-surface text-text">
                      {city.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* 3. تاريخ الرحلة */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-[11px] font-bold text-muted mr-1">تاريخ الرحلة</label>
          <div className="relative h-[60px] px-3.5 py-2.5 rounded-[11px] border border-border bg-surface flex items-center gap-2.5 focus-within:border-primary transition-colors">
            <Calendar className="w-5 h-5 text-primary shrink-0 pointer-events-none" />
            <input
              type="date"
              value={tripDate}
              onChange={(e) => setTripDate(e.target.value)}
              className="w-full bg-transparent text-xs font-extrabold text-text outline-none cursor-pointer text-right"
            />
          </div>
        </div>

        {/* 4. عدد المسافرين */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-[11px] font-bold text-muted mr-1">المسافرين</label>
          <div className="relative h-[60px] px-3.5 py-2.5 rounded-[11px] border border-border bg-surface flex items-center gap-2.5 focus-within:border-primary transition-colors">
            <Users className="w-5 h-5 text-primary shrink-0 pointer-events-none" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full bg-transparent text-sm font-extrabold text-text outline-none cursor-pointer appearance-none text-right"
            >
              <option value="1" className="bg-surface text-text">1 مسافر</option>
              <option value="2" className="bg-surface text-text">2 مسافرين</option>
              <option value="3" className="bg-surface text-text">3 مسافرين</option>
              <option value="4" className="bg-surface text-text">4 مسافرين</option>
            </select>
          </div>
        </div>

        {/* 5. زر البحث */}
        <div className="w-full self-end">
          <Button
            type="submit"
            variant="primary"
            icon={Search}
            iconPosition="right"
            to="/book"
            className="w-full h-[60px] text-xs font-extrabold justify-center !rounded-[11px]"
          >
            ابحث عن رحلات
          </Button>
        </div>
      </form>
    </div>
  );
}