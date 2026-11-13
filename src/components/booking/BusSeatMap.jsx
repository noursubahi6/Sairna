import { useState } from "react";
import { Armchair, Bus, Gauge, Info, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import Button from "../button/Button";

export default function BusSeatMap({
  totalSeats = 44,
  occupiedSeats = [],
  passengersCount = 1,
  selectedSeats,
  setSelectedSeats,
  onContinue,
  authError,
  onLoginClick,
}) {
  const [warningMsg, setWarningMsg] = useState("");

  const handleSeatClick = (seatNumber) => {
    setWarningMsg("");

    if (occupiedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((num) => num !== seatNumber));
      return;
    }

    if (selectedSeats.length >= passengersCount) {
      setWarningMsg(
        `مسموح تختار ${passengersCount} ${passengersCount === 1 ? "مقعد" : "مقاعد"} فقط حسب عدد المسافرين!`
      );
      return;
    }

    setSelectedSeats([...selectedSeats, seatNumber]);
  };

  const rowsCount = Math.ceil(totalSeats / 4);
  const rows = Array.from({ length: rowsCount }, (_, rowIndex) => {
    const start = rowIndex * 4 + 1;
    return [start, start + 1, start + 2, start + 3].filter((n) => n <= totalSeats);
  });

  const isComplete = selectedSeats.length === passengersCount;

  return (
    <div className="bg-[var(--surface)] rounded-2xl shadow-sm border border-[var(--border)] p-6 font-cairo">
      {/* رأس الكرت */}
      <div className="mb-6">
        <h2 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
          <Armchair className="w-6 h-6 text-[var(--primary)]" />
          <span>اختيار مكانك المفضّل</span>
        </h2>
        <p className="text-xs text-[var(--muted)] font-bold mt-1">
          اختار {passengersCount} مقعد من المخطط. المقاعد الرمادية محجوزة مسبقاً.
        </p>
      </div>

      {/* مخطط الباص + كرت مكانك راحتك */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* هيكل الباص */}
        <div className="border-2 border-[var(--border)] rounded-t-[3.5rem] rounded-b-3xl p-5 bg-[var(--surface-alt)]/50 max-w-[320px] mx-auto w-full">
          <div className="flex items-center justify-between border-b border-dashed border-[var(--border)] pb-3 mb-5 text-[var(--muted)] text-xs font-extrabold">
            <span className="flex items-center gap-1.5">
              <Bus className="w-4 h-4" /> مقدمة الحافلة
            </span>
            <Gauge className="w-5 h-5 text-[var(--text)]/70" />
          </div>

          <div className="space-y-2.5">
            {rows.map((rowSeats, idx) => (
              <div key={idx} className="flex items-center justify-between gap-1.5">
                <span className="text-[11px] font-bold text-[var(--muted)] w-5 text-center">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="flex gap-2">
                  {rowSeats.slice(0, 2).map((seatNum) => (
                    <SeatButton
                      key={seatNum}
                      number={seatNum}
                      isOccupied={occupiedSeats.includes(seatNum)}
                      isSelected={selectedSeats.includes(seatNum)}
                      onClick={() => handleSeatClick(seatNum)}
                    />
                  ))}
                </div>

                <div className="w-4"></div>

                <div className="flex gap-2">
                  {rowSeats.slice(2, 4).map((seatNum) => (
                    <SeatButton
                      key={seatNum}
                      number={seatNum}
                      isOccupied={occupiedSeats.includes(seatNum)}
                      isSelected={selectedSeats.includes(seatNum)}
                      onClick={() => handleSeatClick(seatNum)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* دليل الألوان */}
          <div className="flex items-center justify-center gap-5 border-t border-[var(--border)] pt-4 mt-6 text-[11px] font-bold text-[var(--muted)]">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[var(--surface)] border border-[var(--border)] inline-block"></span>
              <span>متاح</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[var(--primary)] inline-block"></span>
              <span>مختار</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-gray-200 dark:bg-slate-700 inline-block"></span>
              <span>محجوز</span>
            </div>
          </div>
        </div>

        {/* كرت "مكانك، راحتك" + التنبيهات */}
        <div className="space-y-4">
          <div className="border border-[var(--border)] rounded-2xl p-6 text-center bg-[var(--surface)] shadow-sm">
            <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl flex items-center justify-center mx-auto mb-3">
              <Armchair className="w-6 h-6" />
            </div>
            <h3 className="font-black text-[var(--text)] text-lg">مكانك، راحتك.</h3>
            <p className="text-xs text-[var(--muted)] font-medium mt-1 mb-6 leading-relaxed">
              اختار مقعدك حسب تفضيلك. المكان عند الشباك أو بالممر، الخيار إلك.
            </p>

            <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs font-bold">
              <span className="text-[var(--muted)]">المقاعد المختارة</span>
              <span className="font-black text-[var(--primary)] text-sm">
                {selectedSeats.length} / {passengersCount}
              </span>
            </div>

            <div className="mt-4">
              {selectedSeats.length === 0 ? (
                <p className="text-xs text-[var(--muted)]">لسا ما اخترت مقعد</p>
              ) : (
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat}
                      className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-extrabold rounded-lg shadow-sm"
                    >
                      مقعد {seat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {warningMsg ? (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{warningMsg}</span>
            </div>
          ) : (
            <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>للتكمل، اختار عدد مقاعد مساوي لعدد المسافرين.</span>
            </div>
          )}
        </div>
      </div>

      {/* تنبيه تسجيل الدخول إن وجد */}
      {authError && (
        <div className="mt-6 bg-amber-50 border border-amber-300 text-amber-800 p-4 rounded-2xl text-xs font-bold flex items-center justify-between">
          <span>🔒 {authError}</span>
          <Button size="sm" variant="dark" onClick={onLoginClick}>
            تسجيل الدخول الآن
          </Button>
        </div>
      )}

      {/* الأزرار مدمجة داخل الكرت مع الخط الفاصل */}
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-5 mt-8">
        <Button
          variant="outline"
          size="md"
          icon={ArrowRight}
          iconPosition="left"
          to="/book"
        >
          الرجوع للرحلات
        </Button>

        <Button
          variant="primary"
          size="md"
          icon={ArrowLeft}
          iconPosition="right"
          onClick={onContinue}
          disabled={!isComplete}
          className={!isComplete ? "opacity-50 pointer-events-none" : ""}
        >
          متابعة الحجز
        </Button>
      </div>
    </div>
  );
}

function SeatButton({ number, isOccupied, isSelected, onClick }) {
  let containerStyle =
    "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]";

  if (isOccupied) {
    containerStyle =
      "bg-gray-200/80 dark:bg-slate-800 border-transparent text-gray-400 cursor-not-allowed opacity-70";
  } else if (isSelected) {
    containerStyle =
      "bg-[var(--primary)] border-[var(--primary)] text-white shadow-md scale-105";
  }

  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={onClick}
      className={`relative w-12 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 cursor-pointer ${containerStyle}`}
    >
      <Armchair className="w-4 h-4 mb-0.5" strokeWidth={2} />
      <span
        className={`absolute bottom-0.5 right-1.5 text-[9px] font-black leading-none ${
          isSelected ? "text-white" : "opacity-75"
        }`}
      >
        {number}
      </span>
    </button>
  );
}