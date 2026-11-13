import React from "react";
import { Users, User, Phone, Info, ArrowRight, ArrowLeft } from "lucide-react";
import Button from "../button/Button";

export default function PassengerDetailsForm({
  selectedSeats = [],
  passengersData,
  setPassengersData,
  onBack,
  onSubmit,
}) {
  const handleInputChange = (index, field, value) => {
    const updated = [...passengersData];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setPassengersData(updated);
  };

  // التحقق من اكتمال الحقول
  const isFormValid =
    passengersData.length > 0 &&
    passengersData.every(
      (p) => p.passengerName.trim().length >= 2 && p.passengerPhone.trim().length >= 8
    );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSubmit();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-[var(--surface)] rounded-2xl shadow-sm border border-[var(--border)] p-6 font-cairo"
    >
      {/* رأس الكرت */}
      <div className="mb-6">
        <h2 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
          <Users className="w-6 h-6 text-[var(--primary)]" />
          <span>مين مسافر معنا؟</span>
        </h2>
        <p className="text-xs text-[var(--muted)] font-bold mt-1">
          دخل بيانات المسافرين حسب عدد المقاعد المختارة.
        </p>
      </div>

      {/* بطاقات المسافرين */}
      <div className="space-y-5">
        {selectedSeats.map((seatNumber, index) => {
          const passenger = passengersData[index] || {
            seatNumber,
            passengerName: "",
            passengerPhone: "",
          };

          return (
            <div
              key={seatNumber}
              className="border border-[var(--border)] rounded-2xl p-5 bg-[var(--surface-alt)]/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] font-black text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="font-extrabold text-[var(--text)] text-sm">
                    المسافر {index + 1}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-lg bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--muted)] text-xs font-extrabold">
                  مقعد رقم {seatNumber}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[var(--text)] mb-1.5">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[var(--muted)] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="مثال: أحمد خالد"
                      value={passenger.passengerName}
                      onChange={(e) =>
                        handleInputChange(index, "passengerName", e.target.value)
                      }
                      className="w-full bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--primary)] rounded-xl py-2.5 pr-10 pl-3 text-xs font-bold text-[var(--text)] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[var(--text)] mb-1.5">
                    رقم الموبايل <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[var(--muted)] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      dir="ltr"
                      required
                      placeholder="09xxxxxxxx"
                      value={passenger.passengerPhone}
                      onChange={(e) =>
                        handleInputChange(index, "passengerPhone", e.target.value)
                      }
                      className="w-full bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--primary)] rounded-xl py-2.5 pr-10 pl-3 text-xs font-bold text-[var(--text)] text-right outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* شريط الملاحظة */}
      <div className="mt-6 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
        <Info className="w-4 h-4 shrink-0" />
        <span>هذه بيانات تجريبية فقط، لا تدخل معلوماتك الحساسة في نسخة التدريب.</span>
      </div>

      {/* الأزرار مدمجة داخل الفورم مع الخط الفاصل */}
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-5 mt-8">
        <Button
          type="button"
          variant="outline"
          size="md"
          icon={ArrowRight}
          iconPosition="left"
          onClick={onBack}
        >
          السابق
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={ArrowLeft}
          iconPosition="right"
          disabled={!isFormValid}
          className={!isFormValid ? "opacity-50 pointer-events-none" : ""}
        >
          متابعة الحجز
        </Button>
      </div>
    </form>
  );
}