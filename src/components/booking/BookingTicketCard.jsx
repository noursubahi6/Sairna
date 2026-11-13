import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  CheckCircle2,
  Bus,
  Armchair,
  Wallet,
  GitBranch,
} from "lucide-react";
import Button from "../button/Button";

export default function BookingTicketCard({ booking }) {
  const navigate = useNavigate();

  if (!booking) return null;

  // استخراج بيانات الرحلة والحجز بمرونة
  const trip = booking.trip || booking;
  const bookingCode =
    booking.bookingCode ||
    booking.code ||
    `SR-${String(booking.id || "0433396").padStart(7, "0")}`;

  const originName = trip.origin?.name || trip.fromCity || "حلب";
  const destinationName = trip.destination?.name || trip.toCity || "دمشق";

  // استخراج اسم الشركة مع التعامل مع القيم البرمجية الوهمية باسم عام ومحايد
  const rawCompanyName = trip.company?.name || booking.companyName;
  const companyName = (!rawCompanyName || rawCompanyName.toLowerCase() === "gstring")
    ? "شركة النقل"
    : rawCompanyName;

  const companyLetter = companyName.trim().charAt(0) || "ش";

  // استخراج صورة الشركة إن وجدت
  const rawLogo = trip.company?.logo || trip.company?.logoUrl || trip.company?.image;
  const logoSrc = rawLogo
    ? rawLogo.startsWith("http")
      ? rawLogo
      : `https://sairna.abdulrahman-hares.com${rawLogo.startsWith("/") ? "" : "/"}${rawLogo}`
    : null;

  // استخراج المقاعد (سواء جاءت مصفوفة كائنات أو مصفوفة أرقام)
  const seatsList = Array.isArray(booking.seats)
    ? booking.seats.map((s) => (typeof s === "object" ? s.seatNumber : s))
    : booking.selectedSeats || [];

  const totalPrice =
    booking.totalPrice ||
    (Number(trip.price || 0) * (seatsList.length || 1));

  // تنسيق الوقت والتاريخ بأرقام إنجليزية ونصوص عربية
  const formatTime = (iso) => {
    if (!iso) return "--:--";
    return new Date(iso).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("ar-SY-u-nu-latn", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow)] overflow-hidden font-cairo mb-5 transition-all duration-300 hover:border-[var(--primary)]/50"
      dir="rtl"
    >
      {/* 1. رأس الكرت: رقم الحجز + شارة التأكيد */}
      <div className="bg-[var(--surface-alt)]/50 border-b border-dashed border-[var(--border)] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--soft-teal)] text-[var(--primary)] flex items-center justify-center shrink-0">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[11px] text-[var(--muted)] font-bold">
              رقم الحجز
            </span>
            <strong dir="ltr" className="block text-sm font-black text-[var(--text)]">
              {bookingCode}
            </strong>
          </div>
        </div>

        {/* شارة الحالة */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--soft-teal)] text-[var(--primary)] text-xs font-extrabold">
          <CheckCircle2 className="w-4 h-4" />
          <span>تم تأكيد الحجز</span>
        </span>
      </div>

      {/* 2. جسم الكرت: مدن الانطلاق والوصول + معلومات الشركة والمقعد والسعر */}
      <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
        {/* المسار والوقت (يأخذ 8 أعمدة) */}
        <div className="lg:col-span-8 flex items-center justify-between gap-4">
          {/* نقطة الانطلاق */}
          <div className="text-right min-w-[80px]">
            <span className="block text-xs text-[var(--muted)] font-bold mb-1">من</span>
            <strong className="block text-xl md:text-2xl font-black text-[var(--text)]">
              {originName}
            </strong>
            <span dir="ltr" className="block text-xs font-extrabold text-[var(--text)] mt-1">
              {formatTime(trip.departureAt || trip.departureTime)}
            </span>
          </div>

          {/* الخط المنقط الوسطي مع الباص والتاريخ */}
          <div className="flex-1 flex flex-col items-center px-2">
            <div className="w-8 h-8 rounded-full bg-[var(--soft-teal)] text-[var(--primary)] flex items-center justify-center mb-1.5">
              <Bus className="w-4 h-4" />
            </div>
            <div className="w-full border-t-2 border-dashed border-[var(--border)] my-1"></div>
            <span className="text-[11px] text-[var(--muted)] font-bold mt-1.5 text-center">
              {formatDate(trip.departureAt || trip.departureTime)}
            </span>
          </div>

          {/* نقطة الوصول */}
          <div className="text-left min-w-[80px]">
            <span className="block text-xs text-[var(--muted)] font-bold mb-1">إلى</span>
            <strong className="block text-xl md:text-2xl font-black text-[var(--text)]">
              {destinationName}
            </strong>
            <span dir="ltr" className="block text-xs font-extrabold text-[var(--text)] mt-1">
              {formatTime(trip.arrivalAt || trip.arrivalTime)}
            </span>
          </div>
        </div>

        {/* تفاصيل الشركة والمقاعد والسعر (يأخذ 4 أعمدة) */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-r border-[var(--border)] pt-4 lg:pt-0 lg:pr-6 space-y-2.5 text-xs font-bold">
          {/* الشركة */}
          <div className="flex items-center gap-2.5">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={companyName}
                className="w-7 h-7 rounded-lg object-contain bg-white border border-[var(--border)] p-0.5"
              />
            ) : (
              <span className="w-7 h-7 rounded-lg bg-[var(--soft-teal)] text-[var(--primary)] font-black flex items-center justify-center text-xs">
                {companyLetter}
              </span>
            )}
            <span className="text-[var(--text)] font-extrabold">{companyName}</span>
          </div>

          {/* المقعد */}
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <Armchair className="w-4 h-4 text-[var(--muted)] shrink-0" />
            <span>
              المقعد:{" "}
              <strong className="text-[var(--text)]">
                {seatsList.length > 0
                  ? seatsList.map((s) => Number(s).toLocaleString("en-US")).join(" ، ")
                  : "-"}
              </strong>
            </span>
          </div>

          {/* السعر */}
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <Wallet className="w-4 h-4 text-[var(--muted)] shrink-0" />
            <strong className="text-[var(--text)]">
              {Number(totalPrice).toLocaleString("en-US")} ل.س
            </strong>
          </div>
        </div>
      </div>

      {/* 3. فوتر الكرت: أزرار عرض التذكرة وتتبع الرحلة */}
      <div className="border-t border-[var(--border)] px-6 py-4 flex items-center justify-end gap-3 bg-[var(--surface-alt)]/30">
        <Button
          variant="outline"
          size="sm"
          icon={GitBranch}
          iconPosition="right"
          onClick={() =>
            navigate("/track", {
              state: { bookingCode, booking },
            })
          }
        >
          تتبع الرحلة
        </Button>

        <Button
          variant="outline"
          size="sm"
          icon={Ticket}
          iconPosition="right"
          onClick={() =>
            navigate(`/my-bookings/${booking.id || bookingCode}`, {
              state: { booking },
            })
          }
          className="bg-[var(--surface-alt)] hover:border-[var(--primary)]"
        >
          عرض التذكرة
        </Button>
      </div>
    </div>
  );
}