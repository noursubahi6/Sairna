import { Ticket, ShieldCheck, ArrowLeft } from "lucide-react";

export default function BookingSummaryCard({ trip, passengersCount, selectedSeats = [] }) {
  if (!trip) return null;

  // حساب السعر الإجمالي
  const totalPrice = (Number(trip.price) || 0) * Number(passengersCount || 1);

  // تنسيق الوقت بأرقام إنجليزية
  const formatTime = (isoString) => {
    if (!isoString) return "--:--";
    return new Date(isoString).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // تنسيق التاريخ بالعربي مع أرقام إنجليزية
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("ar-SY-u-nu-latn", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // استخراج رابط صورة الشركة أياً كان اسم الحقل القادم من الـ API
  const rawLogo =
    trip.company?.logo ||
    trip.company?.logoUrl ||
    trip.company?.image ||
    trip.companyLogo ||
    trip.logo;

  const logoSrc = rawLogo
    ? rawLogo.startsWith("http")
      ? rawLogo
      : `https://sairna.abdulrahman-hares.com${rawLogo.startsWith("/") ? "" : "/"}${rawLogo}`
    : null;

  return (
    <div className="bg-[var(--surface)] rounded-2xl shadow-[var(--shadow)] border border-[var(--border)] p-6 top-24 font-cairo transition-colors duration-300">
      {/* العنوان */}
      <div className="flex items-center gap-2 text-[var(--primary)] font-black text-lg mb-6">
        <Ticket className="w-5 h-5" strokeWidth={2.2} />
        <h3>ملخص الحجز</h3>
      </div>

      {/* معلومات الشركة */}
      <div className="flex items-center justify-between bg-[var(--surface-alt)] border border-[var(--border)] p-3 rounded-xl mb-6">
        <div className="flex items-center gap-3">
          {logoSrc ? (
            <div className="w-10 h-10 rounded-lg bg-white border border-[var(--border)] p-1 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={logoSrc}
                alt={trip.company?.name || "شركة النقل"}
                className="w-full h-full object-contain rounded"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-[var(--soft-teal)] text-[var(--primary)] font-bold flex items-center justify-center text-lg shrink-0">
              {trip.company?.name?.charAt(2) || trip.company?.name?.charAt(0) || "ش"}
            </div>
          )}

          <div>
            <h4 className="font-bold text-[var(--text)] text-sm">{trip.company?.name}</h4>
            <p className="text-xs text-[var(--muted)]">رحلة مباشرة</p>
          </div>
        </div>
      </div>

      {/* الانطلاق والوصول */}
      <div className="flex items-center justify-between bg-[var(--surface-alt)] border border-[var(--border)] p-4 rounded-xl mb-6 text-center">
        <div>
          <span className="text-xs text-[var(--muted)] block">الانطلاق</span>
          <strong className="text-[var(--text)] text-base block my-1">{trip.origin?.name}</strong>
          <span dir="ltr" className="text-xs font-semibold text-[var(--muted)] block">
            {formatTime(trip.departureAt)}
          </span>
        </div>

        <div className="text-[var(--primary)] px-3 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" strokeWidth={2.2} />
        </div>

        <div>
          <span className="text-xs text-[var(--muted)] block">الوصول</span>
          <strong className="text-[var(--text)] text-base block my-1">{trip.destination?.name}</strong>
          <span dir="ltr" className="text-xs font-semibold text-[var(--muted)] block">
            {formatTime(trip.arrivalAt)}
          </span>
        </div>
      </div>

      {/* التفاصيل */}
      <div className="space-y-3 text-sm border-b border-[var(--border)] pb-4 mb-4">
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">تاريخ الرحلة</span>
          <span className="font-semibold text-[var(--text)]">{formatDate(trip.departureAt)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">المسافرين</span>
          <span className="font-semibold text-[var(--text)]">
            {Number(passengersCount).toLocaleString("en-US")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">المقاعد</span>
          <span className="font-semibold text-[var(--primary)]">
            {selectedSeats.length > 0
              ? selectedSeats.map((s) => Number(s).toLocaleString("en-US")).join(" ، ")
              : "لم تُحدد بعد"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">السعر للمسافر</span>
          <span className="font-semibold text-[var(--text)]">
            {Number(trip.price || 0).toLocaleString("en-US")} ل.س
          </span>
        </div>
      </div>

      {/* السعر الإجمالي */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-[var(--text)]">السعر الإجمالي</span>
        <span className="text-xl font-extrabold text-[var(--primary)]">
          {totalPrice.toLocaleString("en-US")} ل.س
        </span>
      </div>

      <div className="bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--muted)] text-xs font-bold p-3 rounded-xl flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-[var(--primary)] shrink-0" />
        <span>لا يوجد دفع حقيقي ضمن المشروع التعليمي.</span>
      </div>
    </div>
  );
}