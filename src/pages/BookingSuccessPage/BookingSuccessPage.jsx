import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { Check, Ticket, Navigation } from "lucide-react";

export const BookingSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // استلام بيانات الحجز الممررة من صفحة المراجعة
  const { bookingResult, tripInfo, selectedSeats } = location.state || {};

  // استخراج البيانات الحقيقية أو عرض قيم افتراضية مطابقة للصورة
  const bookingId = bookingResult?.id || bookingResult?.bookingCode || `SR-${Math.floor(100000 + Math.random() * 900000)}`;
  const originName = tripInfo?.origin?.name || "حلب";
  const destinationName = tripInfo?.destination?.name || "دمشق";
  const seatsList = selectedSeats?.join(', ') || "15";

  return (
    <section className="container py-12 font-cairo flex items-center justify-center min-h-[80vh]" dir="rtl">
      <div className="max-w-xl w-full bg-white rounded-[32px] border border-border p-8 md:p-10 shadow-sm text-center">
        
        {/* أيقونة الصح الخضراء */}
        <div className="w-20 h-20 bg-soft-teal/60 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Check className="w-10 h-10 stroke-[2.5]" />
        </div>

        {/* الترويسة والعنوان */}
        <div className="inline-block bg-soft-teal/30 text-primary text-xs font-bold px-3.5 py-1.5 rounded-full mb-3">
          ✨ صار الحجز جاهز
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-text mb-2">
          يا سلام! تم تأكيد حجزك.
        </h2>
        <p className="text-xs md:text-sm text-muted mb-8">
          انضافت التذكرة إلى «حجوزاتي». هلق بتقدر تراجعها وتتابع الرحلة التجريبية.
        </p>

        {/* صندوق تفاصيل الحجز (رقم الحجز، الوجهة، المقاعد) */}
        <div className="bg-surface border border-dashed border-border rounded-2xl p-5 mb-8 grid grid-cols-3 gap-4 items-center">
          
          <div className="text-center border-l border-border/60 pl-2">
            <span className="text-[11px] text-muted block mb-1">رقم الحجز</span>
            <span className="text-xs md:text-sm font-black text-text block">{bookingId}</span>
          </div>

          <div className="text-center border-l border-border/60 pl-2">
            <span className="text-[11px] text-muted block mb-1">الوجهة</span>
            <span className="text-xs md:text-sm font-black text-text block truncate">{originName} – {destinationName}</span>
          </div>

          <div className="text-center">
            <span className="text-[11px] text-muted block mb-1">المقاعد</span>
            <span className="text-xs md:text-sm font-black text-primary block">{seatsList}</span>
          </div>

        </div>

        {/* أزرار الإجراءات */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/my-bookings")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-border text-xs font-bold text-text hover:bg-surface transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-primary" />
            <span>تتبع الرحلة</span>
          </button>

          <Button
            onClick={() => navigate("/")}
            variant="primary"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 !rounded-2xl text-xs font-bold shadow-md hover:opacity-95 transition-all"
          >
            <Ticket className="w-4 h-4" />
            <span>عرض تذكرتي</span>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default BookingSuccessPage;