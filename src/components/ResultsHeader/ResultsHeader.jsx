import React from 'react';
import { Calendar, ArrowLeft, ChevronDown } from 'lucide-react';

export const ResultsHeader = ({
  tripsCount = 0,
  fromCity = 'اختر مدينة الانطلاق',
  toCity = 'اختر مدينة الوصول',
  travelDate,
  passengersCount = 1,
  sortBy,
  onSortChange,
}) => {
  const formatArabicDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('ar-SY', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 font-cairo">
      {/* القسم الأيمن: عدد الرحلات + المسار + التاريخ وعدد المسافرين */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-[20px] font-black text-[var(--text)] m-0">
            {tripsCount} رحلات متاحة
          </h2>

          {/* شارة المسار: من - إلى */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--soft-teal)] text-[var(--primary)] text-[12px] font-bold">
            <span>{fromCity}</span>
            <ArrowLeft size={14} strokeWidth={2.5} />
            <span>{toCity}</span>
          </span>
        </div>

        {/* سطر التاريخ وعدد المسافرين */}
        {travelDate && (
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--muted)] font-medium">
            <Calendar size={13} className="shrink-0" />
            <span>{formatArabicDate(travelDate)}</span>
            <span className="mx-1">·</span>
            <span>{passengersCount} مسافر</span>
          </div>
        )}
      </div>

      {/* القسم الأيسر: قائمة الترتيب حسب */}
      <div className="flex items-center gap-2.5 self-end sm:self-auto">
        <span className="text-[11px] text-[var(--muted)] font-bold">
          ترتيب حسب
        </span>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15 rounded-[11px] py-2 pr-3.5 pl-9 text-[12px] font-bold text-[var(--text)] cursor-pointer outline-none transition-all shadow-sm"
          >
            <option value="departure">وقت الانطلاق</option>
            <option value="price">أقل سعر</option>
            <option value="duration">أقصر مدة</option>
          </select>

          <ChevronDown
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};