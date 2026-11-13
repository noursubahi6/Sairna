import React from 'react';
import { Filter } from "lucide-react";

export const FiltersSidebar = ({
  companies = [],
  selectedCompanyId,
  onSelectCompany,
  selectedTimeSlot,
  onSelectTimeSlot,
  onResetFilters,
}) => {
  const timeSlots = [
    { id: 'all', label: 'كل الأوقات' },
    { id: 'morning', label: 'صباحاً (قبل 12)' },
    { id: 'afternoon', label: 'ظهراً (12-17)' },
    { id: 'evening', label: 'مساءً (بعد 17)' },
  ];

  const handleReset = () => {
    if (onResetFilters) {
      onResetFilters();
    } else {
      onSelectCompany(null);
      onSelectTimeSlot('all');
    }
  };

  return (
    <aside className="border border-[var(--border)] rounded-[17px] bg-[var(--surface)] p-[22px] sticky top-[103px] font-cairo">
      {/* رأس القائمة */}
      <div className="flex items-center justify-between gap-[7px] border-b border-[var(--border)] pb-[19px]">
        <h3 className="flex items-center gap-2 text-[13px] font-bold text-slate-800 m-0">
          <Filter className="w-4 h-4 " />
          تصفية النتائج
        </h3>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-emerald-600 hover:text-emerald-700 font-bold transition-colors cursor-pointer"
        >
          إعادة ضبط
        </button>
      </div>

      {/* شركات النقل */}
      <div className="pt-[22px]">
        <h4 className="text-[12px] font-bold  uppercase m-0 mb-[13px]">شركة النقل</h4>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="company-filter"
              checked={selectedCompanyId === null}
              onChange={() => onSelectCompany(null)}
              className="text-emerald-600 focus:ring-emerald-500"
            />
            <span className={selectedCompanyId === null ? 'font-bold text-slate-900' : 'text-slate-600'}>
              كل الشركات
            </span>
          </label>

          {companies.map((comp) => (
            <label key={comp.id} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="company-filter"
                checked={selectedCompanyId === comp.id}
                onChange={() => onSelectCompany(comp.id)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className={selectedCompanyId === comp.id ? 'font-bold ' : 'text-muted'}>
                {comp.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* أوقات الانطلاق */}
      <div className="pt-[22px]">
        <h4 className="text-[12px] font-bold  uppercase m-0 mb-[13px]">وقت الانطلاق</h4>
        <div className="space-y-2.5 text-sm">
          {timeSlots.map((time) => (
            <label key={time.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="time-filter"
                checked={selectedTimeSlot === time.id}
                onChange={() => onSelectTimeSlot(time.id)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className={selectedTimeSlot === time.id ? 'font-bold ' : 'text-muted'}>
                {time.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};