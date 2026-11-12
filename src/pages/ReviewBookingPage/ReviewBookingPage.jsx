import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateBooking } from "../../hooks/useTrips";

import Button from "../../components/button/Button";
import { CheckCircle2, Wallet, CreditCard, ArrowRight } from "lucide-react";
import BookingSummary from "../../components/BookingSummary/BookingSummary";

export const ReviewBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripId, selectedSeats, tripInfo, passengerData } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("office"); // office أو online
  const createBookingMutation = useCreateBooking();

const handleConfirmBooking = () => {
    // التأكد من استخراج الtripId وتحويله لرقم صحيح بوضوح
    const parsedTripId = Number(tripId || tripInfo?.id || location.state?.tripId);

    const bookingPayload = {
      tripId: parsedTripId, // 👈 إرساله كـ رقم صحيح (Integer)
      seats: selectedSeats.map((seatNum) => ({
        seatNumber: Number(seatNum),
        passengerName: passengerData?.name || "مسافر",
        passengerPhone: passengerData?.phone || "0912345678",
      })),
    };

 createBookingMutation.mutate(bookingPayload, {
      onSuccess: (response) => {
        // تجهيز بيانات الحجز الجديد لتخزينها
        const newBooking = {
          id: response?.id || response?.bookingCode || `SR-${Math.floor(100000 + Math.random() * 900000)}`,
          tripInfo,
          selectedSeats,
          passengerData,
          date: new Date().toISOString(),
        };

        // جلب الحجوزات القديمة وإضافة الحجز الجديد إليها
        const existingBookings = JSON.parse(localStorage.getItem("my_bookings") || "[]");
        localStorage.setItem("my_bookings", JSON.stringify([newBooking, ...existingBookings]));

        // الانتقال لصفحة النجاح
        navigate("/book/success", { 
          state: { 
            bookingResult: response, 
            tripInfo, 
            selectedSeats, 
            passengerData 
          } 
        });
      },
    });
  };

  return (
    <section className="container py-8 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 order-2 lg:order-1">
          <BookingSummary trip={tripInfo} selectedSeats={selectedSeats} />
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2 bg-white rounded-[21px] border border-border p-6 shadow-sm">
          <div className="mb-6 pb-4 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-text">كل شي جاهز؟ ✅</h2>
              <p className="text-xs text-muted">راجع معلومات الرحلة قبل ما تثبت الحجز[cite: 18].</p>
            </div>
          </div>

          {/* تفاصيل المسافرين */}
          <div className="bg-surface border border-border rounded-2xl p-4 mb-6">
            <h4 className="text-xs font-bold text-muted mb-3">تفاصيل المسافرين</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="font-extrabold text-text">{passengerData?.name || "اسم المسافر"}</span>
              <span className="text-xs text-muted font-bold">{passengerData?.phone || "09xxxxxxx"}</span>
              <span className="bg-soft-teal px-3 py-1 rounded-lg text-primary text-xs font-bold">المقعد {selectedSeats?.join(', ')}</span>
            </div>
          </div>

          {/* طريقة تأكيد الحجز */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-muted mb-3">طريقة تأكيد الحجز</h4>
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'office' ? 'border-primary bg-soft-teal/20' : 'border-border'}`}>
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-sm font-bold text-text block">الدفع في مكتب الشركة</span>
                    <span className="text-[11px] text-muted">ادفع عند الحضور لمكتب الشركة قبل الرحلة — عرض تجريبي.</span>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'office'} 
                  onChange={() => setPaymentMethod('office')} 
                  className="accent-primary" 
                />
              </label>

              <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-primary bg-soft-teal/20' : 'border-border'}`}>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-sm font-bold text-text block">دفع إلكتروني (تجريبي)</span>
                    <span className="text-[11px] text-muted">محاكاة لواجهة الدفع فقط؛ لن يتم تحصيل أي مبلغ.</span>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'online'} 
                  onChange={() => setPaymentMethod('online')} 
                  className="accent-primary" 
                />
              </label>
            </div>
          </div>

          <div className="bg-soft-teal/30 p-3 rounded-xl text-xs text-primary-deep flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-primary" />
            <span>بتأكيد الحجز، رح تضاف تذكرة تجريبية لقائمة «حجوزاتي» في هذا المتصفح[cite: 18].</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 px-5 py-3 rounded-xl border border-border text-xs font-bold text-muted hover:text-text cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" /> السابق
            </button>

            <Button 
              onClick={handleConfirmBooking}
              variant="primary" 
              className="px-8 py-3 !rounded-xl"
              disabled={createBookingMutation.isPending}
            >
              {createBookingMutation.isPending ? "جاري التأكيد..." : "تأكيد الحجز ←"}
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};