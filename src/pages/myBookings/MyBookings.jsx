import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, MapPin, Calendar, Users, ArrowRight } from "lucide-react";

export const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // جلب الحجوزات المخزنة محلياً عند فتح الصفحة
    const savedBookings = JSON.parse(localStorage.getItem("my_bookings") || "[]");
    setBookings(savedBookings);
  }, []);

  return (
    <section className="container py-8 font-cairo min-h-[80vh]" dir="rtl">
      <div className="max-w-4xl mx-auto">
        
        {/* الترويسة */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div>
            <h1 className="text-2xl font-black text-text">حجوزاتي</h1>
            <p className="text-xs text-muted mt-1">سجل التذاكر والحجوزات الخاصة برحلاتك السابقة والقادمة.</p>
          </div>
          <button 
            onClick={() => navigate("/Book")}
            className="text-xs font-bold text-primary bg-soft-teal/40 px-4 py-2 rounded-xl hover:bg-soft-teal transition-all cursor-pointer"
          >
            ← حجز رحلة جديدة
          </button>
        </div>

        {/* عرض الحجوزات أو رسالة الفراغ */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-[24px] border border-border p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-surface text-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-8 h-8" />
            </div>
            <h3 className="text-base font-black text-text mb-1">ما عندك أي حجوزات لسا!</h3>
            <p className="text-xs text-muted mb-6">اختار رحلتك القادمة واحجز مقعدك بكل سهولة.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <div key={index} className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-soft-teal text-primary text-[11px] font-black px-2.5 py-1 rounded-lg">
                      رقم الحجز: {booking.id}
                    </span>
                    <span className="text-xs text-muted font-bold">
                      {booking.tripInfo?.origin?.name || "حلب"} ⟵ {booking.tripInfo?.destination?.name || "دمشق"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted font-bold pt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-primary" />
                      المقاعد: {booking.selectedSeats?.join(', ')}
                    </span>
                    <span>•</span>
                    <span>المسافر: {booking.passengerData?.name || "مسافر"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button 
                    onClick={() => navigate("/book/success", { state: { tripInfo: booking.tripInfo, selectedSeats: booking.selectedSeats, bookingResult: { id: booking.id } } })}
                    className="w-full md:w-auto bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md hover:opacity-95 transition-all cursor-pointer"
                  >
                    عرض التذكرة
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default MyBookingsPage;