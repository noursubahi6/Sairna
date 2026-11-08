import { Wifi, Snowflake, ArrowLeft, Users } from "lucide-react";
import Button from "../button/Button";

export default function TripCard({ trip, onSelectSeats }) {
  return (
    <div className="bg-surface border border-border rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all font-cairo flex flex-col md:flex-row items-center justify-between gap-6">
      {/* القسم الأيمن: معلومات الشركة والخدمات */}
      <div className="flex items-start gap-4 w-full md:w-auto">
        <div className="w-12 h-12 rounded-2xl bg-soft-teal flex items-center justify-center text-primary font-black text-xl shrink-0">
          {trip.company?.name ? trip.company.name.charAt(0) : "ش"}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-extrabold text-text">{trip.company?.name}</h3>
            <span className="text-[11px] text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
              ⭐ 4.9 - سعر ممتاز
            </span>
          </div>
          <p className="text-xs text-muted mb-3">رحلة منتظمة ومجهزة بكافة وسائل الراحة</p>

          {/* الخدمات */}
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

      {/* القسم الأوسط: وقت الرحلة والمسار */}
      <div className="flex items-center justify-center gap-6 text-center w-full md:w-auto border-y md:border-y-0 md:border-x border-border py-4 md:py-0 md:px-8">
        <div>
          <span className="text-lg font-black text-text block">
            {trip.departureAt
              ? new Date(trip.departureAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "17:40"}
          </span>
          <span className="text-xs text-muted font-bold">{trip.origin?.name || "حلب"}</span>
        </div>

        <div className="flex flex-col items-center px-4">
          <span className="text-[10px] text-muted mb-1 font-bold">6 س 15 د</span>
          <div className="w-28 h-0.5 bg-border relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-primary absolute"></span>
          </div>
          <span className="text-[10px] text-primary mt-1 font-bold">مباشرة</span>
        </div>

        <div>
          <span className="text-lg font-black text-text block">
            {trip.arrivalAt
              ? new Date(trip.arrivalAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "23:55"}
          </span>
          <span className="text-xs text-muted font-bold">{trip.destination?.name || "دمشق"}</span>
        </div>
      </div>

      {/* القسم الأيسر: السعر وزر الحجز */}
      <div className="flex flex-col items-end justify-between w-full md:w-auto gap-3 text-left">
        <div>
          <span className="text-[10px] text-muted block">السعر للشخص</span>
          <span className="text-xl font-black text-primary">
            {trip.price || "110,000"} <small className="text-xs font-bold">ل.س</small>
          </span>{" "}
          <span className="flex items-center gap-1 text-[10px] text-muted mt-0.5">
            <Users className="w-3 h-3" /> {trip.availableSeats || 40} مقعد متاح
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
