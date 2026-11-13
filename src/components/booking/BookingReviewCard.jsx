import React, { useState } from "react";
import {
  CheckCircle2,
  User,
  Wallet,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Button from "../button/Button";

export default function BookingReviewCard({
  passengersData = [],
  onBack,
  onConfirm,
  isSubmitting = false,
  errorMessage = "",
}) {
  const [paymentMethod, setPaymentMethod] = useState("office"); // office | electronic

  return (
    <div className="bg-[var(--surface)] rounded-2xl shadow-sm border border-[var(--border)] p-6 font-cairo">
      {/* رأس الكرت */}
      <div className="mb-6">
        <h2 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-[var(--primary)]" />
          <span>كل شي جاهز؟</span>
        </h2>
        <p className="text-xs text-[var(--muted)] font-bold mt-1">
          راجع معلومات الرحلة قبل ما تثبت الحجز.
        </p>
      </div>

      {/* قسم تفاصيل المسافرين */}
      <div className="border border-[var(--border)] rounded-2xl p-5 mb-6">
        <h3 className="font-extrabold text-[var(--text)] text-sm mb-4">
          تفاصيل المسافرين
        </h3>

        <div className="space-y-3">
          {passengersData.map((passenger, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[var(--surface-alt)]/60 p-3.5 rounded-xl border border-[var(--border)]/60"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-extrabold text-[var(--text)]">
                    {passenger.passengerName}
                  </strong>
                  <span
                    dir="ltr"
                    className="block text-xs font-bold text-[var(--muted)] text-right mt-0.5"
                  >
                    {passenger.passengerPhone}
                  </span>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-black">
                المقعد {passenger.seatNumber}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* قسم طريقة تأكيد الحجز */}
      <div className="border border-[var(--border)] rounded-2xl p-5 mb-6">
        <h3 className="font-extrabold text-[var(--text)] text-sm mb-4">
          طريقة تأكيد الحجز
        </h3>

        <div className="space-y-3">
          {/* الخيار الأول: الدفع في مكتب الشركة */}
          <label
            onClick={() => setPaymentMethod("office")}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === "office"
                ? "border-[var(--primary)] bg-[var(--primary)]/5"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40"
            }`}
          >
            <div className="flex items-center gap-3.5">
              {/* دائرة الراديو */}
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  paymentMethod === "office"
                    ? "border-[var(--primary)]"
                    : "border-[var(--muted)]/40"
                }`}
              >
                {paymentMethod === "office" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]"></span>
                )}
              </span>

              <Wallet className="w-5 h-5 text-[var(--primary)] shrink-0" />

              <div>
                <strong className="block text-sm font-extrabold text-[var(--text)]">
                  الدفع في مكتب الشركة
                </strong>
                <span className="block text-xs text-[var(--muted)] font-medium mt-0.5">
                  ادفع عند الحضور لمكتب الشركة قبل الرحلة — عرض تجريبي.
                </span>
              </div>
            </div>
          </label>

          {/* الخيار الثاني: دفع إلكتروني (تجريبي) */}
          <label
            onClick={() => setPaymentMethod("electronic")}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === "electronic"
                ? "border-[var(--primary)] bg-[var(--primary)]/5"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  paymentMethod === "electronic"
                    ? "border-[var(--primary)]"
                    : "border-[var(--muted)]/40"
                }`}
              >
                {paymentMethod === "electronic" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]"></span>
                )}
              </span>

              <CreditCard className="w-5 h-5 text-[var(--primary)] shrink-0" />

              <div>
                <strong className="block text-sm font-extrabold text-[var(--text)]">
                  دفع إلكتروني (تجريبي)
                </strong>
                <span className="block text-xs text-[var(--muted)] font-medium mt-0.5">
                  محاكاة لواجهة الدفع فقط؛ لن يتم تحصيل أي مبلغ.
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* شريط التنبيه الأخضر */}
      <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>بتأكيد الحجز، رح تنضاف تذكرة تجريبية لقائمة «حجوزاتي» في هذا المتصفح.</span>
      </div>

      {/* عرض رسالة خطأ إن فشل الطلب من السيرفر */}
      {errorMessage && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* الأزرار مدمجة داخل الكرت مع الخط الفاصل */}
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-5 mt-8">
        <Button
          type="button"
          variant="outline"
          size="md"
          icon={ArrowRight}
          iconPosition="left"
          onClick={onBack}
          disabled={isSubmitting}
        >
          السابق
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          icon={ArrowLeft}
          iconPosition="right"
          onClick={() => onConfirm(paymentMethod)}
          disabled={isSubmitting}
          className={isSubmitting ? "opacity-70 pointer-events-none" : ""}
        >
          {isSubmitting ? "جاري تأكيد الحجز..." : "تأكيد الحجز"}
        </Button>
      </div>
    </div>
  );
}