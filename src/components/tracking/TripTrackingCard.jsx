import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Check,
  Bus,
  MapPin,
  Route,
  Clock,
  Pause,
  Play,
  RotateCcw,
  Info,
} from "lucide-react";
import Button from "../button/Button";

export default function TripTrackingCard({ booking, tripData }) {
  // توحيد مصدر البيانات سواء جاءت من كائن الحجز (booking) أو مباشرة من الرحلة (tripData)
  const trip = booking?.trip || tripData || booking || {};

  const bookingCode =
    booking?.bookingCode ||
    booking?.code ||
    `SR-${String(booking?.id || "0433396").padStart(7, "0")}`;

  const originName = trip.origin?.name || trip.fromCity || "حلب";
  const destinationName = trip.destination?.name || trip.toCity || "دمشق";
  const companyName = trip.company?.name || booking?.companyName || "الشام للنقل";
  const companyLetter =
    companyName.trim().charAt(2) || companyName.trim().charAt(0) || "ش";

  // استخراج صورة الشركة إن وجدت من الـ API
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

  // تنسيق الأوقات بأرقام إنجليزية
  const formatTime = (iso, fallback) => {
    if (!iso) return fallback;
    try {
      return new Date(iso).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return fallback;
    }
  };

  const departureTime = formatTime(trip.departureAt || trip.departureTime, "07:30");
  const arrivalTime = formatTime(trip.arrivalAt || trip.arrivalTime, "13:34");

  // المسافة والمدة الكلية
  const totalDistance = trip.distance ? String(trip.distance).replace(/[^\d]/g, "") : "366";
  const totalHours = trip.durationHours || 5;

  // حالة المحاكاة (التقدم + الإيقاف/التشغيل)
  const [progress, setProgress] = useState(26);
  const [isPaused, setIsPaused] = useState(false);

  // مؤقت تحريك تقدم الرحلة (يتوقف عند الضغط على "إيقاف الحركة")
  useEffect(() => {
    if (isPaused || progress >= 100) return;

    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 800);

    return () => clearInterval(timer);
  }, [isPaused, progress]);

  // حساب الساعات المتبقية بناءً على نسبة التقدم
  const remainingHours = Math.max(
    1,
    Math.ceil(((100 - progress) / 100) * totalHours)
  );

  // تحديد حالة منتصف الطريق بناءً على التقدم
  const midStatusSubtitle =
    progress >= 100
      ? "وصلت الحافلة إلى الوجهة"
      : progress >= 85
      ? "اقتربنا من محطة الوصول"
      : "الحافلة تتحرك نحو الوجهة";

  // دالة إعادة التدوير (تصفير التقدم وإعادة التشغيل)
  const handleReset = () => {
    setProgress(0);
    setIsPaused(false);
  };

  return (
    <div
      className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-[var(--shadow)] p-6 font-cairo transition-colors duration-300"
      dir="rtl"
    >
      {/* 1. الشريط العلوي: الحالة التجريبية + رقم الحجز */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[var(--primary)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-pulse"></span>
          <span>الرحلة قيد العرض التجريبي</span>
        </div>

        <span dir="ltr" className="text-[11px] font-bold text-[var(--muted)]">
          {bookingCode}
        </span>
      </div>

      {/* 2. مدن الانطلاق والوصول */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="text-right">
          <span className="block text-[11px] text-[var(--muted)] font-bold mb-0.5">
            من
          </span>
          <strong className="text-2xl font-black text-[var(--text)]">
            {originName}
          </strong>
        </div>

        <div className="text-[var(--primary)]">
          <ArrowLeft className="w-5 h-5" strokeWidth={2.2} />
        </div>

        <div className="text-left">
          <span className="block text-[11px] text-[var(--muted)] font-bold mb-0.5">
            إلى
          </span>
          <strong className="text-2xl font-black text-[var(--text)]">
            {destinationName}
          </strong>
        </div>
      </div>

      {/* 3. معلومات شركة النقل + الصورة إن وجدت */}
      <div className="flex items-center gap-3.5 mb-6">
        {logoSrc ? (
          <div className="w-12 h-12 rounded-2xl bg-white border border-[var(--border)] p-1.5 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={logoSrc}
              alt={companyName}
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-[var(--soft-teal)] text-[var(--primary)] font-black text-2xl flex items-center justify-center shrink-0">
            {companyLetter}
          </div>
        )}

        <div>
          <h4 className="font-extrabold text-sm text-[var(--text)]">
            {companyName}
          </h4>
          <p className="text-[11px] text-[var(--muted)] font-bold mt-0.5">
            موعد الانطلاق <span dir="ltr">{departureTime}</span>
          </p>
        </div>
      </div>

      {/* خط منقط فاصل */}
      <div className="border-t-2 border-dashed border-[var(--border)] my-5"></div>

      {/* 4. شريط تقدم الرحلة */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-extrabold mb-2">
          <span className="text-[var(--text)]">تقدّم الرحلة</span>
          <span dir="ltr" className="text-[var(--primary)] font-black">
            {progress}%
          </span>
        </div>

        <div className="w-full h-2 bg-[var(--surface-alt)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--primary)] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 5. التايم لاين لمحطات الرحلة */}
      <div className="relative space-y-5 mb-6 pr-1">
        {/* الخط العمودي المنقط الواصل بين الأيقونات */}
        <div className="absolute top-4 bottom-4 right-[19px] border-r-2 border-dashed border-[var(--border)] z-0"></div>

        {/* المحطة 1: الانطلاق */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Check className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div>
              <strong className="block text-xs font-extrabold text-[var(--text)]">
                {originName}
              </strong>
              <span className="block text-[11px] text-[var(--muted)] font-bold">
                محطة الانطلاق
              </span>
            </div>
          </div>
          <span dir="ltr" className="text-[11px] font-bold text-[var(--muted)]">
            {departureTime}
          </span>
        </div>

        {/* المحطة 2: على الطريق */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bus className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-xs font-extrabold text-[var(--text)]">
                على الطريق
              </strong>
              <span className="block text-[11px] text-[var(--muted)] font-bold">
                {midStatusSubtitle}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-black text-[var(--primary)]">
            {progress >= 100 ? "وصلت" : "الآن*"}
          </span>
        </div>

        {/* المحطة 3: الوصول */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                progress >= 100
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--muted)]"
              }`}
            >
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-xs font-extrabold text-[var(--text)]">
                {destinationName}
              </strong>
              <span className="block text-[11px] text-[var(--muted)] font-bold">
                محطة الوصول
              </span>
            </div>
          </div>
          <span dir="ltr" className="text-[11px] font-bold text-[var(--muted)]">
            {arrivalTime}
          </span>
        </div>
      </div>

      {/* 6. مربعا المسافة الكلية والمتبقي التقديري */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[var(--surface-alt)]/60 border border-[var(--border)] rounded-2xl p-3.5">
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--muted)] font-bold mb-1">
            <Route className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span>المسافة الكلية</span>
          </div>
          <strong className="text-sm md:text-base font-black text-[var(--text)]">
            ~{Number(totalDistance).toLocaleString("en-US")} كم
          </strong>
        </div>

        <div className="bg-[var(--surface-alt)]/60 border border-[var(--border)] rounded-2xl p-3.5">
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--muted)] font-bold mb-1">
            <Clock className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span>المتبقي التقديري</span>
          </div>
          <strong className="text-sm md:text-base font-black text-[var(--text)]">
            {progress >= 100
              ? "وصلت الرحلة"
              : `${remainingHours.toLocaleString("en-US")} ساعات تقريباً`}
          </strong>
        </div>
      </div>

      {/* 7. أزرار التحكم (إيقاف الحركة + إعادة التدوير) باستخدام مكون Button */}
      <div className="flex items-center gap-2.5 mb-4">
        <Button
          variant="primary"
          size="md"
          icon={isPaused ? Play : Pause}
          iconPosition="right"
          onClick={() => setIsPaused((prev) => !prev)}
          className="flex-1 justify-center"
        >
          {isPaused ? "استئناف الحركة" : "إيقاف الحركة"}
        </Button>

        <Button
          variant="outline"
          size="icon"
          icon={RotateCcw}
          onClick={handleReset}
          title="إعادة تشغيل المحاكاة"
          className="!w-12 !h-12 shrink-0"
        />
      </div>

      {/* 8. التنويه التوضيحي السفلي */}
      <div className="flex items-start gap-2 text-[10px] text-[var(--muted)] font-bold leading-relaxed pt-1">
        <Info className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
        <p>
          هذه محاكاة تعليمية فوق خريطة جغرافية حقيقية، وليست تتبع GPS. خط الربط
          بين المدن تقريبي؛ افتح Google Maps لمعرفة الطرق الفعلية.
        </p>
      </div>
    </div>
  );
}