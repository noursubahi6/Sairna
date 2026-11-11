import React from 'react';

export const CompanySelector = ({ companies = [], selectedCompanyId, onSelectCompany }) => {
  const allOption = { id: null, name: 'كل الشركات' };
  const fullList = [allOption, ...companies];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex gap-3 overflow-x-auto">
      {fullList.map((comp) => {
        const isSelected = selectedCompanyId === comp.id;
        const letter = comp.id === null ? 'كل' : comp.name.trim().charAt(0);

        return (
          <button
            key={comp.id ?? 'all'}
            onClick={() => onSelectCompany(comp.id)}
            className={`flex flex-col items-center justify-center min-w-[110px] p-3 rounded-2xl border transition-all cursor-pointer ${
              isSelected
                ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 shadow-sm font-bold'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-black mb-1.5 text-base ${
                isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {letter}
            </div>
            <span className="text-xs whitespace-nowrap">{comp.name}</span>
          </button>
        );
      })}
    </div>
  );
};