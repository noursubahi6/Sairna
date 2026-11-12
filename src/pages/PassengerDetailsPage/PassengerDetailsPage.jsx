import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { User, Phone, Info, ArrowLeft, ArrowRight } from "lucide-react";
import BookingSummary from "../../components/BookingSummary/BookingSummary";

export const PassengerDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripId, selectedSeats = [28], tripInfo } = location.state || {};

  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (!passengerName || !passengerPhone) {
      alert("الرجاء إدخال اسم المسافر ورقم الهاتف");
      return;
    }
    // الانتقال لصفحة المراجعة والتأكيد مع تمرير البيانات
    navigate(`/book/review`, { 
      state: { tripId, selectedSeats, tripInfo, passengerData: { name: passengerName, phone: passengerPhone } } 
    });
  };

  return (
    <section className="container py-8 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 order-2 lg:order-1">
          <BookingSummary trip={tripInfo} selectedSeats={selectedSeats} />
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2 bg-white rounded-[21px] border border-border p-6 shadow-sm">
          <div className="mb-6 pb-4 border-b border-border">
            <h2 className="text-lg font-black text-text">مين مسافر معنا؟ 👥</h2>
            <p className="text-xs text-muted">دخل بيانات المسافرين حسب عدد المقاعد المختارة[cite: 17].</p>
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
                <span className="text-xs font-bold text-primary">المسافر 1</span>
                <span className="text-xs bg-soft-teal px-3 py-1 rounded-lg text-primary-deep font-bold">مقعد رقم {selectedSeats[0]}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted block mb-1">الاسم الكامل *</label>
                  <div className="relative flex items-center">
                    <User className="absolute right-3 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      required
                      placeholder="الاسم الثلاثي"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full h-12 pr-10 pl-3 rounded-xl border border-border bg-white text-sm text-text outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-muted block mb-1">رقم الموبايل *</label>
                  <div className="relative flex items-center">
                    <Phone className="absolute right-3 w-4 h-4 text-muted" />
                    <input
                      type="tel"
                      required
                      placeholder="09xxxxxxxx"
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full h-12 pr-10 pl-3 rounded-xl border border-border bg-white text-sm text-text outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-soft-teal/30 p-3 rounded-xl text-xs text-primary-deep flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>هذه بيانات تجريبية فقط، لا تدخل معلوماتك الحساسة في نسخة التدريب[cite: 17].</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 px-5 py-3 rounded-xl border border-border text-xs font-bold text-muted hover:text-text cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" /> السابق
              </button>

              <Button type="submit" variant="primary" className="px-8 py-3 !rounded-xl">
                متابعة الحجز ←
              </Button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};