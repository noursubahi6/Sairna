import { Wifi, Snowflake, ArrowLeft, Users, Bus, Star } from "lucide-react";
import { getCompanyStyle } from "./constants/companyStyles";
import Button from "./button/Button";

export default function TripCard({ trip, onSelectSeats }) {
  const formatTime = (isoString) => {
    if (!isoString) return "--:--";
    try {
      return new Date(isoString).toLocaleTimeString("ar-SY", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const departure = trip.departureTime || trip.departureAt;
  const arrival = trip.arrivalTime || trip.arrivalAt;

  const companyId = trip.company?.id || trip.companyId;
  const companyName = trip.company?.name || trip.companyName || 'شركة النقل';
  const firstLetter = companyName ? companyName.trim().charAt(2) : "";

  const companyStyle = getCompanyStyle(companyId);

  return (
    <article className="bg-[var(--surface)] border border-[var(--border)] rounded-[17px] overflow-hidden transition-all duration-250 hover:border-[#b4e4db] hover:shadow-[var(--shadow-md)] hover:-translate-y-[3px] font-cairo mb-4" dir="rtl">

      {/* 1. رأس الكارت */}
      <div className="flex items-center justify-between px-[23px] pt-[19px] pb-[13px] gap-[10px]">
        <div className="flex items-center gap-[11px]">
          <div className={`w-[49px] h-[49px] flex-shrink-0 rounded-[14px] grid place-items-center font-black text-[27px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] ${companyStyle.bgBadge}`}>
            {firstLetter}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <strong className="text-[13px] font-extrabold text-[var(--text)]">{companyName}</strong>
            </div>
            {/* عرض النجمة المفرغة باللون المطلوب وتحتها الـ subtitle */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] font-black text-[var(--text)] flex items-center gap-1">
                {companyStyle.rating}
                <Star size={12} className="text-[#E8A43D]" strokeWidth={2.2} />
              </span>
              <span className="text-[11px] text-[var(--muted)] font-bold">
                - {companyStyle.subtitle}
              </span>
            </div>
          </div>
        </div>

        <span className="inline-flex items-center gap-[6px] border border-[var(--border)] rounded-[20px] px-[11px] py-[5px] text-[var(--muted)] text-[10px] font-bold">
          <Bus size={12} /> حافلة سياحية
        </span>
      </div>

      {/* 2. جسم الكارت (التوقيت ومدن الانطلاق والوصول الديناميكية) */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_180px] items-center gap-[14px] px-[23px] pb-[23px] pt-[14px]">
        <div className="flex items-center justify-between gap-[17px]">
          {/* نقطة الوصول */}
          <div className="flex flex-col min-w-[60px]">
            <b className="text-[23px] font-black leading-[1.5] text-[var(--text)]">
              {formatTime(arrival)}
            </b>
            <span className="text-[11px] text-[var(--muted)] font-extrabold">
              {trip.destination?.name || trip.toCity || 'مدينة الوصول'}
            </span>
          </div>

          {/* خط المسار */}
          <div className="flex flex-col items-center flex-1 min-w-[110px]">
            <span className="text-[10px] text-[var(--muted)] font-extrabold">مباشرة</span>
            <div className="flex items-center justify-center gap-[9px] w-full my-[4px] text-[var(--primary)]">
              <i className="flex-1 border-t border-dashed border-[#b6ccd2]"></i>
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0"></span>
              <i className="flex-1 border-t border-dashed border-[#b6ccd2]"></i>
            </div>
            <small className="text-[10px] text-[var(--primary)] font-extrabold">
              {trip.durationFormatted || 'رحلة مباشرة'}
            </small>
          </div>

          {/* نقطة الانطلاق */}
          <div className="flex flex-col min-w-[60px]">
            <b className="text-[23px] font-black leading-[1.5] text-[var(--text)]">
              {formatTime(departure)}
            </b>
            <span className="text-[11px] text-[var(--muted)] font-extrabold">
              {trip.origin?.name || trip.fromCity || 'مدينة الانطلاق'}
            </span>
          </div>
        </div>

        {/* قسم الحجز والسعر */}
        <div className="flex flex-col border-t md:border-t-0 md:border-r border-[var(--border)] pt-3 md:pt-0 md:pr-[20px] justify-between">
          <small className="text-[var(--muted)] text-[10px]">السعر للشخص</small>
          <b className="text-[19px] text-[var(--dark-deep)] dark:text-[var(--text)] font-black whitespace-nowrap">
            {trip.price ? Number(trip.price).toLocaleString() : 0} <small className="text-xs font-bold">ل.س</small>
          </b>

          <div className="flex items-center gap-[5px] text-[var(--primary)] text-[10px] font-extrabold my-[11px]">
            <Users size={12} /> {trip.availableSeats ?? 0} مقعد متاح
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={ArrowLeft}
            iconPosition="right"
            onClick={() => onSelectSeats && onSelectSeats(trip.id)}
            className="w-full justify-center !min-h-[38px] !py-[7px] !px-[10px] !text-[11px]"
          >
            اختيار المقاعد
          </Button>
        </div>
      </div>

      {/* 3. فوتر الكارت */}
      <div className="border-t border-[var(--border)] px-[23px] py-[11px] flex items-center gap-[7px] flex-wrap">
        <span className="bg-[var(--surface-alt)] px-[9px] py-[5px] text-[var(--muted)] text-[10px] font-bold rounded-[6px] inline-flex items-center gap-[5px]">
          <Snowflake size={11} className="text-[var(--primary)]" /> مكيف
        </span>
        <span className="bg-[var(--surface-alt)] px-[9px] py-[5px] text-[var(--muted)] text-[10px] font-bold rounded-[6px] inline-flex items-center gap-[5px]">
          <Wifi size={11} className="text-[var(--primary)]" /> شحن USB
        </span>

        <div className="mr-auto inline-flex items-center gap-[5px] text-[var(--muted)] text-[10px]">
          <span>⟷</span> {trip.distance || 'مسافة الرحلة'}
        </div>
      </div>
    </article>
  );
}