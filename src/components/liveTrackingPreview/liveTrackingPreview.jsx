import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bus, SlidersHorizontal, RotateCcw } from 'lucide-react';
import Button from '../components/button/Button';
import { useTrips } from '../hooks/useTrips';

export default function TripResultsPage() {
  const [searchParams] = setSearchParams();
  
  const originId = searchParams.get('originId') || '1';
  const destinationId = searchParams.get('destinationId') || '1';
  const date = searchParams.get('date') || '2026-11-05';

  // حالات الفلاتر
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');

  // استخدام React Query عبر الهوك
  const { data, isLoading, isError } = useTrips({
    originId,
    destinationId,
    date,
    companyId: selectedCompany
  });

  const trips = Array.isArray(data) ? data : data?.trips || [];

  // فلترة الوقت محلياً
  const filteredTrips = trips.filter(trip => {
    if (selectedTimeFilter === 'all') return true;
    const hour = parseInt(trip.departureTime?.split(':')[0] || '0', 10);
    if (selectedTimeFilter === 'morning' && hour < 12) return true;
    if (selectedTimeFilter === 'afternoon' && hour >= 12 && hour < 17) return true;
    if (selectedTimeFilter === 'evening' && hour >= 17) return true;
    return false;
  });

  const handleResetFilters = () => {
    setSelectedCompany('all');
    setSelectedTimeFilter('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-cairo dir-rtl" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* شريط الشركات العلوي */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex items-center gap-4 overflow-x-auto">
          <button 
            onClick={() => setSelectedCompany('all')}
            className={`flex flex-col items-center justify-center min-w-[100px] p-3 rounded-xl border transition-all ${
              selectedCompany === 'all' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600'
            }`}
          >
            <Bus className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold">كل الشركات</span>
          </button>

          <button 
            onClick={() => setSelectedCompany('1')}
            className={`flex flex-col items-center justify-center min-w-[100px] p-3 rounded-xl border transition-all ${
              selectedCompany === '1' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs mb-1">ش</span>
            <span className="text-xs font-bold">الشام للنقل</span>
            <span className="text-[10px] text-amber-500 font-bold">★ 4.9</span>
          </button>
        </div>

        {/* عدد الرحلات */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-text">
            {filteredTrips.length} رحلات متاحة <span className="text-sm font-normal text-muted">حمص ← اللاذقية</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* قسم الرحلات (الوسط) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {isLoading ? (
              <div className="text-center py-12 text-muted">جاري تحميل الرحلات...</div>
            ) : isError ? (
              <div className="text-center py-12 text-red-500">حدث خطأ أثناء جلب البيانات.</div>
            ) : filteredTrips.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm text-muted">لا توجد رحلات مطابقة لخياراتك.</div>
            ) : (
              filteredTrips.map((trip) => (
                <div key={trip.id} className="bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-md">
                  
                  <div className="flex flex-col items-end md:items-start gap-3 w-full md:w-auto">
                    <span className="text-xs text-muted">السعر للشخص</span>
                    <div className="text-2xl font-black text-primary">
                      {trip.price || '70,000'} <span className="text-xs font-bold">ل.س</span>
                    </div>
                    <Button 
                      variant="primary" 
                      to={`/book/${trip.id}`} 
                      className="w-full md:w-auto text-xs !rounded-[11px]"
                    >
                      اختيار المقاعد ←
                    </Button>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto md:flex-1 px-4">
                    <div className="text-center">
                      <span className="text-lg font-black block text-text">{trip.arrivalTime || '10:02'}</span>
                      <span className="text-xs text-muted font-bold">اللاذقية</span>
                    </div>

                    <div className="flex flex-col items-center px-4 flex-1">
                      <span className="text-[11px] text-muted mb-1">مباشرة</span>
                      <div className="w-full border-t-2 border-dashed border-gray-300 relative"></div>
                    </div>

                    <div className="text-center">
                      <span className="text-lg font-black block text-text">{trip.departureTime || '07:30'}</span>
                      <span className="text-xs text-muted font-bold">حمص</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <div className="text-right">
                      <h4 className="font-extrabold text-sm text-text">{trip.companyName || 'الشام للنقل'}</h4>
                      <span className="text-[11px] text-amber-500 font-bold">★ 4.9</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">ش</div>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* الفلتر الجانبي (يمين) */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border h-fit flex flex-col gap-6">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-black text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> تصفية النتائج
              </span>
              <button onClick={handleResetFilters} className="text-xs text-primary font-bold flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> إعادة ضبط
              </button>
            </div>

            {/* فلتر وقت الانطلاق */}
            <div className="flex flex-col gap-2 pt-3">
              <span className="text-xs font-bold text-muted">وقت الانطلاق</span>
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                <input type="radio" name="time" checked={selectedTimeFilter === 'all'} onChange={() => setSelectedTimeFilter('all')} className="accent-primary" /> كل الأوقات
              </label>
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                <input type="radio" name="time" checked={selectedTimeFilter === 'morning'} onChange={() => setSelectedTimeFilter('morning')} className="accent-primary" /> صباحاً (قبل 12)
              </label>
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                <input type="radio" name="time" checked={selectedTimeFilter === 'afternoon'} onChange={() => setSelectedTimeFilter('afternoon')} className="accent-primary" /> ظهراً (12-17)
              </label>
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                <input type="radio" name="time" checked={selectedTimeFilter === 'evening'} onChange={() => setSelectedTimeFilter('evening')} className="accent-primary" /> مساءً (بعد 17)
              </label>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}