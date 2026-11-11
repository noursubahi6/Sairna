import React from 'react';

export const FiltersSidebar = ({
  companies = [],
  selectedCompanyId,
  onSelectCompany,
  selectedTimeSlot,
  onSelectTimeSlot,
}) => {
  const timeSlots = [
    { id: 'all', label: 'كل الأوقات' },
    { id: 'morning', label: 'صباحاً (قبل 12)' },
    { id: 'afternoon', label: 'ظهراً (12-17)' },
    { id: 'evening', label: 'مساءً (بعد 17)' },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm sticky top-6 font-cairo">
      <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">تصفية النتائج</h3>

      {/* شركات النقل */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">شركة النقل</h4>
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
              <span className={selectedCompanyId === comp.id ? 'font-bold text-slate-900' : 'text-slate-600'}>
                {comp.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* أوقات الانطلاق */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">وقت الانطلاق</h4>
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
              <span className={selectedTimeSlot === time.id ? 'font-bold text-slate-900' : 'text-slate-600'}>
                {time.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};