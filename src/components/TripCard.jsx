import { Wifi, Snowflake, ArrowLeft, Users } from "lucide-react";
import Button from "./button/Button";

export default function TripCard({ trip, onSelectSeats }) {
  // دالة تنسيق الوقت من الـ API
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

  // قراءة القيم الصافية القادمة من الـ API
  const departure = trip.departureTime || trip.departureAt;
  const arrival = trip.arrivalTime || trip.arrivalAt;
  const companyName = trip.company?.name;
  const firstLetter = companyName ? companyName.trim().charAt(0) : "";

  return (
    <div className="bg-surface border border-border rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all font-cairo flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
      {/* القسم الأيمن: معلومات الشركة */}
      <div className="flex items-start gap-4 w-full md:w-auto">
        <div className="w-12 h-12 rounded-2xl bg-soft-teal flex items-center justify-center text-primary font-black text-xl shrink-0">
          {firstLetter}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-extrabold text-text">{companyName}</h3>
            {trip.company?.rating && (
              <span className="text-[11px] text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
                ⭐ {trip.company.rating}
              </span>
            )}
          </div>
          <p className="text-xs text-muted mb-3">رحلة منتظمة ومجهزة بكافة وسائل الراحة</p>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] bg-surface-alt text-muted px-2.5 py-1 rounded-lg border border-border">
              <Snowflake className="w-3 h-3 text-primary" /> مكيف
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] bg-surface-alt text-muted px-2.5 py-1 rounded-lg border border-border">
              <Wifi className="w-3 h-3 text-primary" /> Wi-Fi
            </span>
          </div>
        </div>
      </div>

      {/* القسم الأوسط: التوقيت والمسار */}
      <div className="flex items-center justify-center gap-6 text-center w-full md:w-auto border-y md:border-y-0 md:border-x border-border py-4 md:py-0 md:px-8">
        <div>
          <span className="text-lg font-black text-text block">
            {formatTime(departure)}
          </span>
          <span className="text-xs text-muted font-bold">
            {trip.origin?.name}
          </span>
        </div>

        <div className="flex flex-col items-center px-4">
          <span className="text-[10px] text-muted mb-1 font-bold">مباشرة</span>
          <div className="w-28 h-0.5 bg-border relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-primary absolute"></span>
          </div>
          <span className="text-[10px] text-primary mt-1 font-bold">حافلة سياحية</span>
        </div>

        <div>
          <span className="text-lg font-black text-text block">
            {formatTime(arrival)}
          </span>
          <span className="text-xs text-muted font-bold">
            {trip.destination?.name}
          </span>
        </div>
      </div>

      {/* القسم الأيسر: السعر والمقاعد */}
      <div className="flex flex-col items-end justify-between w-full md:w-auto gap-3 text-left">
        <div>
          <span className="text-[10px] text-muted block">السعر للشخص</span>
          <span className="text-xl font-black text-primary">
            {trip.price ? Number(trip.price).toLocaleString() : 0}{" "}
            <small className="text-xs font-bold">ل.س</small>
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted mt-0.5">
            <Users className="w-3 h-3" /> {trip.availableSeats} مقعد متاح
          </span>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={ArrowLeft}
          iconPosition="right"
          onClick={() => onSelectSeats && onSelectSeats(trip.id)}
        >
          اختيار المقاعد
        </Button>
      </div>
    </div>
  );
}