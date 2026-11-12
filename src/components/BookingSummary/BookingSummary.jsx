export default function BookingSummary({ trip, selectedSeats = [], passengersCount = 1 }) {
  const count = selectedSeats.length > 0 ? selectedSeats.length : passengersCount;
  const pricePerSeat = trip?.price || 130000;
  const totalPrice = count * pricePerSeat;

  return (
    <div className="bg-white rounded-[21px] border border-border p-5 shadow-sm font-cairo sticky top-6" dir="rtl">
      {/* ترويسة ملخص الحجز */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <span className="w-2 h-2 rounded-full bg-primary"></span>
        <h4 className="text-sm font-black text-text">ملخص الحجز</h4>
      </div>

      {/* معلومات الشركة */}
      <div className="bg-soft-teal/30 p-3 rounded-2xl mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-black text-text block">{trip?.company?.name || 'الشام للنقل'}</span>
          <span className="text-[10px] text-muted">رحلة مباشرة</span>
        </div>
        <div className="w-9 h-9 rounded-xl bg-soft-teal text-primary-deep flex items-center justify-center font-bold text-sm">
          ش
        </div>
      </div>

      {/* تفاصيل الانطلاق والوصول */}
      <div className="bg-surface p-3.5 rounded-2xl border border-border mb-4 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-muted block mb-0.5">الانطلاق</span>
          <span className="font-bold text-text block">{trip?.origin?.name || 'حلب'}</span>
          <span className="text-[10px] text-muted">{trip?.departureAt ? new Date(trip.departureAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '07:30'}</span>
        </div>
        <span className="text-primary font-bold text-base">←</span>
        <div className="text-left">
          <span className="text-[10px] text-muted block mb-0.5">الوصول</span>
          <span className="font-bold text-text block">{trip?.destination?.name || 'دمشق'}</span>
          <span className="text-[10px] text-muted">{trip?.arrivalAt ? new Date(trip.arrivalAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '13:34'}</span>
        </div>
      </div>

      {/* التفاصيل والبيانات */}
      <div className="space-y-3 text-xs mb-4 pb-4 border-b border-dashed border-border text-muted">
        <div className="flex justify-between items-center">
          <span>تاريخ الرحلة</span>
          <span className="font-bold text-text">{trip?.departureAt ? new Date(trip.departureAt).toLocaleDateString('ar-SA') : 'الجمعة، ١٣ تشرين الثاني ٢٠٢٦'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>المسافرين</span>
          <span className="font-bold text-text">{count}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>المقاعد</span>
          <span className="font-bold text-primary">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'لم تُحدد بعد'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>السعر للمسافر</span>
          <span className="font-bold text-text">{pricePerSeat.toLocaleString()} ل.س</span>
        </div>
      </div>

      {/* السعر الإجمالي */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-black text-text">السعر الإجمالي</span>
        <span className="text-lg font-black text-primary">{totalPrice.toLocaleString()} ل.س</span>
      </div>

      {/* تذييل تعليمي */}
      <div className="bg-soft-teal/40 p-3 rounded-xl text-[11px] text-primary-deep flex items-center gap-2 justify-center font-bold">
        <span>🛡️ لا يوجد دفع حقيقي ضمن المشروع التعليمي.</span>
      </div>
    </div>
  );
}