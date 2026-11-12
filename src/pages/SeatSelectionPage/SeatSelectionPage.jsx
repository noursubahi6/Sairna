import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTripSeats } from "../../hooks/useTrips";
import Button from "../../components/button/Button";
import { ArrowRight, ArrowLeft, Info, Armchair } from "lucide-react";
import BookingSummary from "../../components/BookingSummary/BookingSummary";

export const SeatSelectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tripFromState = location.state?.trip;
  const passengerCount = location.state?.passengers || 1;

  const { data: seatsData, isLoading } = useTripSeats(id);
  const tripInfo = tripFromState || seatsData?.trip || {};
  const occupiedSeats = seatsData?.occupiedSeats || seatsData?.bookedSeats || [];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatNum) => {
    if (occupiedSeats.includes(seatNum)) return;

    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNum));
    } else {
      if (selectedSeats.length >= passengerCount) {
        alert(`عذراً، لقد اخترت الحد الأقصى للمقاعد (${passengerCount}) بناءً على عدد المسافرين المحدد.`);
        return;
      }
      setSelectedSeats([...selectedSeats, seatNum]);
    }
  };

  const handleProceed = () => {
    if (selectedSeats.length !== passengerCount) {
      alert(`الرجاء اختيار عدد مقاعد مساوي تماماً لعدد المسافرين (${passengerCount}).`);
      return;
    }

    navigate(`/book/passengers`, { 
      state: { 
        tripId: id, 
        selectedSeats, 
        tripInfo, 
        passengers: passengerCount 
      } 
    });
  };

  return (
    <section className="container py-8 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ملخص الحجز الجانبي */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <BookingSummary trip={tripInfo} selectedSeats={selectedSeats} passengersCount={passengerCount} />
        </div>

        {/* محتوى اختيار المقاعد */}
        <div className="lg:col-span-2 order-1 lg:order-2 bg-white rounded-[24px] border border-border p-6 md:p-8 shadow-sm">
          
          {/* الترويسة */}
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-border">
            <div>
              <div className="flex items-center gap-1.5 text-primary text-xs font-bold mb-1">
                <span>💺</span>
                <span>اختر مكانك المفضّل</span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-text">اختر مقعد من المخطط المقاعد محجوزة مسبقاً.</h2>
            </div>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-primary transition-colors cursor-pointer bg-surface px-4 py-2 rounded-xl border border-border"
            >
              <span>رجوع للرحلات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* البطاقة الجانبية */}
            <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-soft-teal text-primary flex items-center justify-center mb-3">
                  💺
                </div>
                <h4 className="font-black text-text text-sm mb-1.5">مكانك، راحتك.</h4>
                <p className="text-xs text-muted leading-relaxed">اختار مقعدك حسب تفضيلك. المكان عند الشباك أو بالممر، الخيار إلك.</p>
              </div>

              <div className="my-5 py-4 border-y border-border">
                <span className="text-[11px] text-muted block mb-1">المقاعد المختارة</span>
                <span className="text-base font-black text-primary">
                  {selectedSeats.length > 0 ? `مقعد ${selectedSeats.join(', ')}` : 'لسا ما اخترت مقعد'}
                </span>
              </div>

              <div className="bg-soft-teal/40 p-3 rounded-xl text-xs text-primary-deep flex items-center gap-2 font-bold">
                <Info className="w-4 h-4 shrink-0 text-primary" />
                <span>لتكمل، اختار عدد مقاعد مساوي لعدد المسافرين.</span>
              </div>
            </div>

            {/* هيكل الحافلة وتخطيط المقاعد المطابق للصورة */}
            <div className="md:col-span-2 bg-surface/50 border border-border rounded-3xl p-6 flex flex-col items-center">
              
              {/* مقدمة الحافلة */}
              <div className="w-full max-w-xs flex items-center justify-between text-xs text-muted mb-4 pb-3 border-b border-dashed border-border px-4 font-bold">
                <span className="flex items-center gap-1.5">🚍 مقدمة الحافلة</span>
                <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs">🕒</span>
              </div>

              {isLoading ? (
                <div className="py-16 text-slate-400 font-bold text-sm">جاري تحميل خريطة المقاعد من السيرفر...</div>
              ) : (
                <div className="w-full max-w-xs space-y-2.5 mb-6">
                  {/* تخطيط الحافلة 11 صفاً، كل صف 4 مقاعد مع أيقونة مقعد ورقم */}
                  {Array.from({ length: 11 }, (_, rowIndex) => {
                    const rowSeats = [rowIndex * 4 + 1, rowIndex * 4 + 2, rowIndex * 4 + 3, rowIndex * 4 + 4];
                    const rowNumber = rowIndex + 1;
                    const formattedRowNumber = rowNumber < 10 ? `0${rowNumber}` : `${rowNumber}`;

                    return (
                      <div key={rowIndex} className="flex items-center justify-between gap-3">
                        {/* الجهة اليمنى (مقعدين) */}
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          {rowSeats.slice(0, 2).map((seatNum) => {
                            const isSelected = selectedSeats.includes(seatNum);
                            const isOccupied = occupiedSeats.includes(seatNum);
                            const formattedSeatNum = seatNum < 10 ? `0${seatNum}` : `${seatNum}`;

                            return (
                              <button
                                key={seatNum}
                                onClick={() => toggleSeat(seatNum)}
                                disabled={isOccupied}
                                className={`h-11 rounded-xl border flex items-center justify-center gap-1.5 px-2 transition-all ${
                                  isOccupied
                                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-default opacity-70 shadow-none"
                                    : isSelected
                                    ? "bg-primary text-white border-primary shadow-md scale-105 cursor-pointer"
                                    : "bg-white border-border text-slate-600 hover:border-primary shadow-sm cursor-pointer"
                                }`}
                              >
                                <Armchair className="w-4 h-4 shrink-0 opacity-70" />
                                <span className="text-[11px] font-black">{formattedSeatNum}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* رقم الصف في المنتصف */}
                        <span className="text-[11px] text-muted font-bold w-6 text-center">
                          {formattedRowNumber}
                        </span>

                        {/* الجهة اليسرى (مقعدين) */}
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          {rowSeats.slice(2, 4).map((seatNum) => {
                            const isSelected = selectedSeats.includes(seatNum);
                            const isOccupied = occupiedSeats.includes(seatNum);
                            const formattedSeatNum = seatNum < 10 ? `0${seatNum}` : `${seatNum}`;

                            return (
                              <button
                                key={seatNum}
                                onClick={() => toggleSeat(seatNum)}
                                disabled={isOccupied}
                                className={`h-11 rounded-xl border flex items-center justify-center gap-1.5 px-2 transition-all ${
                                  isOccupied
                                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-default opacity-70 shadow-none"
                                    : isSelected
                                    ? "bg-primary text-white border-primary shadow-md scale-105 cursor-pointer"
                                    : "bg-white border-border text-slate-600 hover:border-primary shadow-sm cursor-pointer"
                                }`}
                              >
                                <Armchair className="w-4 h-4 shrink-0 opacity-70" />
                                <span className="text-[11px] font-black">{formattedSeatNum}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* مفتاح الألوان (Legend) */}
              <div className="flex items-center gap-6 text-xs text-muted font-bold pt-3 border-t border-border w-full justify-center">
                <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-lg bg-white border border-border inline-block shadow-sm"></span> متاح</div>
                <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-lg bg-primary inline-block shadow-sm"></span> مختار</div>
                <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-lg bg-slate-200 inline-block"></span> محجوز</div>
              </div>

            </div>
          </div>

          {/* زر المتابعة السفلي */}
          <div className="mt-8 pt-5 border-t border-border flex justify-between items-center">
            <div className="text-xs text-muted font-bold">
              تم اختيار <span className="text-primary font-black">{selectedSeats.length}</span> من أصل <span className="text-text font-black">{passengerCount}</span> مقاعد
            </div>
            <Button 
              onClick={handleProceed}
              variant="primary" 
              className="px-8 py-3.5 !rounded-xl text-sm font-bold shadow-md hover:opacity-95 transition-all"
            >
              متابعة الحجز ←
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SeatSelectionPage;