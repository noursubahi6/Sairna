import React from "react";
import { Check, Sparkles, Ticket, SlidersHorizontal } from "lucide-react";
import Button from "../button/Button";

export default function BookingSuccessCard({ bookingCode, trip, selectedSeats = [] }) {
  const originName = trip?.origin?.name || trip?.fromCity || "حلب";
  const destinationName = trip?.destination?.name || trip?.toCity || "دمشق";

  return (
    <div
      className="bg-[var(--surface)] rounded-3xl shadow-sm border border-[var(--border)] p-8 md:p-10 max-w-xl mx-auto text-center font-cairo my-8"
      dir="rtl"
    >
      {/* دائرة الصح الخضراء */}
      <div className="w-16 h-16 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8" strokeWidth={2.8} />
      </div>

      {/* الشارة الصغيرة */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-extrabold mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>صار الحجز جاهز</span>
      </div>

      {/* العنوان الرئيسي */}
      <h2 className="text-2xl md:text-3xl font-black text-[var(--text)] mb-2">
        يا سلام! <span className="text-[var(--primary)]">تم تأكيد حجزك.</span>
      </h2>
      <p className="text-xs text-[var(--muted)] font-bold mb-7">
        انضافت التذكرة إلى «حجوزاتي». هلق بتقدر تراجعها وتتابع الرحلة التجريبية.
      </p>

      {/* صندوق تفاصيل التذكرة المنقط */}
      <div className="grid grid-cols-3 items-center bg-[var(--surface-alt)]/60 border-2 border-dashed border-[var(--border)] rounded-2xl py-4 px-3 mb-7">
        {/* رقم الحجز */}
        <div className="border-l border-dashed border-[var(--border)] px-2">
          <span className="block text-[11px] text-[var(--muted)] font-bold mb-1">
            رقم الحجز
          </span>
          <strong dir="ltr" className="block text-xs md:text-sm font-black text-[var(--text)]">
            {bookingCode || "SR-0433396"}
          </strong>
        </div>

        {/* الوجهة */}
        <div className="border-l border-dashed border-[var(--border)] px-2">
          <span className="block text-[11px] text-[var(--muted)] font-bold mb-1">
            الوجهة
          </span>
          <strong className="block text-xs md:text-sm font-black text-[var(--text)]">
            {originName} ← {destinationName}
          </strong>
        </div>

        {/* المقاعد */}
        <div className="px-2">
          <span className="block text-[11px] text-[var(--muted)] font-bold mb-1">
            المقاعد
          </span>
          <strong className="block text-xs md:text-sm font-black text-[var(--text)]">
            {selectedSeats.length > 0
              ? selectedSeats.map((s) => Number(s).toLocaleString("en-US")).join(" ، ")
              : "-"}
          </strong>
        </div>
      </div>

      {/* الأزرار باستخدام مكون Button الخاص بكِ */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          icon={Ticket}
          iconPosition="left"
          to="/my-bookings"
        >
          عرض تذكرتي
        </Button>

        <Button
          variant="outline"
          size="md"
          icon={SlidersHorizontal}
          iconPosition="right"
          to="/track"
        >
          تتبع الرحلة
        </Button>
      </div>
    </div>
  );
}