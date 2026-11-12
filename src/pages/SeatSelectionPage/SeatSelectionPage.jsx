import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bus, ArrowLeft, ShieldCheck, Loader2, Info } from 'lucide-react';
import PageHeader from '../../components/PAGhkjf/page-hero';
import Button from '../../components/button/Button';
import { useTripSeats, useCreateBooking } from '../../hooks/useTrips';

export default function SeatSelectionPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  // جلب بيانات المقاعد وحالة الحجز عبر الـ API
  const { data: seatData, isLoading, isError } = useTripSeats(tripId || 1);
  const bookingMutation = useCreateBooking();

  // المقاعد المختارة
  const [selectedSeats, setSelectedSeats] = useState([]);

  // بيانات افتراضية للرحلة (يمكن ربطها بصفحة النتائج لاحقاً عبر الـ State أو Query)
  const tripInfo = {
    companyName: "الشام للنقل",
    tripType: "رحلة مباشرة",
    origin: "حلب",
    destination: "دمشق",
    departureTime: "17:00",
    arrivalTime: "23:04",
    date: "الخميس، ١٢ تشرين الثاني ٢٠٢٦",
    pricePerSeat: 127000,
  };

  const occupiedSeats = seatData?.occupiedSeats || [];
  const totalSeats = seatData?.totalSeats || 44;

  // التعامل مع النقر على المقعد
  const handleSeatClick = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length >= 4) {
        alert("يمكنك حجز بحد أقصى 4 مقاعد في المرة الواحدة.");
        return;
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // إرسال الحجز والانتقال للخطوة التالية
  const handleProceedBooking = () => {
    if (selectedSeats.length === 0) {
      alert("الرجاء اختيار مقعد واحد على الأقل للمتابعة.");
      return;
    }

    const payload = {
      tripId: Number(tripId || 1),
      seats: selectedSeats.map((seatNum) => ({
        seatNumber: seatNum,
        passengerName: "مسافر تجريبي",
        passengerPhone: "0912345678",
      })),
    };

    bookingMutation.mutate(payload, {
      onSuccess: () => {
        navigate(`/book/passenger-info?tripId=${tripId}&seats=${selectedSeats.join(',')}`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-cairo dir-rtl pb-16" dir="rtl">
      
      {/* رأس الصفحة بتصميم Sairna */}
      <PageHeader
        breadcrumb={[
          { name: 'الرئيسية', path: '/' },
          { name: 'الرحلات', path: '/book' },
          { name: 'إتمام الحجز' }
        ]}
        breadcrumbPosition="top"
        badgeText="باقي شوي وتوصل"
        title="كمّل حجز"
        titleHighlight="رحلتك."
        size="large"
        showArch={true}
        archPosition="left"
        actionButton={
          <Button 
            variant="outline" 
            icon={ArrowLeft} 
            iconPosition="left"
            to="/book"
            className="text-xs bg-white !rounded-xl"
          >
            تغيير الرحلة
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-20">
        
        {/* شريط خطوات الحجز العلوية */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border mb-8 flex items-center justify-center gap-4 md:gap-12 text-xs font-bold">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
            <span>اختيار المقاعد</span>
          </div>
          <div className="w-12 h-[1px] bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-2 text-muted">
            <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs">2</span>
            <span className="hidden sm:inline">بيانات المسافرين</span>
          </div>
          <div className="w-12 h-[1px] bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-2 text-muted">
            <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs">3</span>
            <span className="hidden sm:inline">المراجعة والتأكيد</span>
          </div>
        </div>

        {/* تخطيط الصفحة (المحتوى الرئيسي وملخص الحجز) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. ملخص الحجز (الجانب الأيمن/الأيسر حسب التخطيط) */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border sticky top-6">
              
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h3 className="font-black text-base text-text flex items-center gap-2">
                  <Bus className="w-5 h-5 text-primary" /> ملخص الحجز
                </h3>
                <div className="text-right">
                  <span className="text-xs font-black text-text block">{tripInfo.companyName}</span>
                  <span className="text-[10px] text-muted">{tripInfo.tripType}</span>
                </div>
              </div>

              {/* تفاصيل الانطلاق والوصول */}
              <div className="bg-gray-50 p-4 rounded-2xl mb-4 flex items-center justify-between">
                <div className="text-center">
                  <span className="text-xs text-muted block mb-1">الوصول</span>
                  <span className="font-black text-sm text-text block">{tripInfo.destination}</span>
                  <span className="text-[10px] text-muted">{tripInfo.arrivalTime}</span>
                </div>

                <div className="flex flex-col items-center px-2">
                  <ArrowLeft className="w-4 h-4 text-primary" />
                </div>

                <div className="text-center">
                  <span className="text-xs text-muted block mb-1">الانطلاق</span>
                  <span className="font-black text-sm text-text block">{tripInfo.origin}</span>
                  <span className="text-[10px] text-muted">{tripInfo.departureTime}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b text-xs">
                <span className="text-muted">تاريخ الرحلة</span>
                <span className="font-bold text-text">{tripInfo.date}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b text-xs">
                <span className="text-muted">المسافرين</span>
                <span className="font-bold text-text">{selectedSeats.length || 1}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b text-xs">
                <span className="text-muted">المقاعد</span>
                <span className="font-bold text-primary">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'لم تحدد بعد'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b text-xs">
                <span className="text-muted">السعر للمسافر</span>
                <span className="font-bold text-text">{tripInfo.pricePerSeat.toLocaleString()} ل.س</span>
              </div>

              {/* السعر الإجمالي */}
              <div className="mt-6 pt-4 border-t flex items-center justify-between">
                <span className="font-black text-sm text-text">السعر الإجمالي</span>
                <span className="font-black text-xl text-primary">
                  {(tripInfo.pricePerSeat * (selectedSeats.length || 1)).toLocaleString()} ل.س
                </span>
              </div>

              <div className="mt-4 bg-primary/5 p-3 rounded-xl flex items-center gap-2 text-[11px] text-primary font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0 text-primary" />
                <span>لا يوجد دفع حقيقي ضمن المشروع التعليمي.</span>
              </div>
            </div>
          </div>

          {/* 2. قسم اختيار المقاعد وخريطة الباص (الجانب الأكبر) */}
          <div className="lg:col-span-8 bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-border flex flex-col order-1 lg:order-2">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-xl font-black text-text">اختار مكانك المفضّل 🚌</h3>
                <p className="text-xs text-muted font-bold mt-1">اختَر مقعداً من المخطط. المقاعد الرمادية محجوزة مسبقاً.</p>
              </div>
            </div>

            {isLoading ? (
              <div className="py-24 flex items-center justify-center gap-2 text-muted">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span>جاري تحميل مخطط المقاعد...</span>
              </div>
            ) : isError ? (
              <div className="py-24 text-center text-red-500 font-bold">حدث خطأ أثناء جلب المقاعد من الخادم.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* البطاقة التفاعلية اليسارية (مكانك راحتك) */}
                <div className="md:col-span-5 bg-gray-50 border border-border rounded-[24px] p-6 flex flex-col justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Bus className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-text">مكانك، راحتك.</h4>
                      <p className="text-[11px] text-muted">اختر مقعدك حسب تفضيلك، المكان عند الشباك أو الممر، الخيار لك.</p>
                    </div>
                  </div>

                  <div className="border-t border-b py-4 flex items-center justify-between">
                    <span className="text-xs text-muted font-bold">المقاعد المختارة</span>
                    <span className="font-black text-primary text-base">
                      {selectedSeats.length} / 0
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-text block mb-1">
                      {selectedSeats.length > 0 ? `المقاعد: ${selectedSeats.join(', ')}` : 'ليسا ما اخترت مقعد'}
                    </span>
                  </div>

                  <div className="bg-soft-teal/40 border border-primary/25 rounded-xl p-3 flex items-center gap-2 text-[11px] text-primary font-bold">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>للكمل، اختر عدد مقاعد مساوي لعدد المسافرين.</span>
                  </div>
                </div>

                {/* خريطة الباص (المقاعد) */}
                <div className="md:col-span-7 bg-gray-50 border border-border rounded-[32px] p-6 flex flex-col items-center">
                  
                  {/* مقدمة الحافلة */}
                  <div className="w-full border-b-2 border-dashed border-gray-200 pb-4 mb-6 flex items-center justify-between px-6 text-muted text-xs font-bold">
                    <span>مقدمة الحافلة</span>
                    <Bus className="w-5 h-5 text-primary" />
                  </div>

                  {/* صفوف المقاعد */}
                  <div className="w-full flex flex-col gap-3 max-h-[400px] overflow-y-auto px-2">
                    {Array.from({ length: Math.ceil(totalSeats / 4) }).map((_, rowIndex) => {
                      const rowStart = rowIndex * 4 + 1;
                      const seatsInRow = [rowStart, rowStart + 1, rowStart + 2, rowStart + 3].filter(s => s <= totalSeats);

                      return (
                        <div key={rowIndex} className="flex items-center justify-between px-2">
                          {/* المقعدين الأيمن */}
                          <div className="flex items-center gap-2">
                            {seatsInRow.slice(0, 2).map((seatNum) => {
                              const isOccupied = occupiedSeats.includes(seatNum);
                              const isSelected = selectedSeats.includes(seatNum);

                              return (
                                <button
                                  key={seatNum}
                                  disabled={isOccupied}
                                  onClick={() => handleSeatClick(seatNum)}
                                  className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center text-xs font-black transition-all cursor-pointer ${
                                    isOccupied 
                                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                      : isSelected 
                                      ? 'bg-primary text-white shadow-md scale-105' 
                                      : 'bg-white border border-border text-text hover:border-primary'
                                  }`}
                                >
                                  <Bus className="w-3.5 h-3.5 mb-0.5 opacity-60" />
                                  <span className="text-[9px]">{seatNum < 10 ? `0${seatNum}` : seatNum}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* رقم الصف */}
                          <span className="text-[11px] font-bold text-gray-400 w-6 text-center">
                            {rowIndex + 1 < 10 ? `0${rowIndex + 1}` : rowIndex + 1}
                          </span>

                          {/* المقعدين الأيسر */}
                          <div className="flex items-center gap-2">
                            {seatsInRow.slice(2, 4).map((seatNum) => {
                              const isOccupied = occupiedSeats.includes(seatNum);
                              const isSelected = selectedSeats.includes(seatNum);

                              return (
                                <button
                                  key={seatNum}
                                  disabled={isOccupied}
                                  onClick={() => handleSeatClick(seatNum)}
                                  className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center text-xs font-black transition-all cursor-pointer ${
                                    isOccupied 
                                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                      : isSelected 
                                      ? 'bg-primary text-white shadow-md scale-105' 
                                      : 'bg-white border border-border text-text hover:border-primary'
                                  }`}
                                >
                                  <Bus className="w-3.5 h-3.5 mb-0.5 opacity-60" />
                                  <span className="text-[9px]">{seatNum < 10 ? `0${seatNum}` : seatNum}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* دليل الألوان (Legend) */}
                  <div className="flex items-center gap-6 mt-8 pt-4 border-t border-gray-200 text-xs font-bold text-muted">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-white border border-gray-300"></span> متاح
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-primary"></span> مختار
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gray-300"></span> محجوز
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* أزرار التنقل السفلية */}
            <div className="w-full mt-8 flex items-center justify-between pt-4 border-t">
              <Button 
                variant="outline" 
                to="/book"
                className="text-xs !rounded-xl"
              >
                ← رجوع للرحلات
              </Button>

              <Button 
                variant="primary" 
                onClick={handleProceedBooking}
                disabled={selectedSeats.length === 0 || bookingMutation.isPending}
                className="text-xs !rounded-xl min-w-[160px]"
              >
                {bookingMutation.isPending ? 'جاري الحجز...' : 'متابعة الحجز'}
              </Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}