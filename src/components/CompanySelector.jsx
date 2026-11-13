import React from 'react';
import { ArrowLeft, Star } from 'lucide-react'; // استيراد أيقونة النجمة المفرغة من المكتبة
import { useCompanies } from '../hooks/useCompanies';
import { getCompanyStyle } from '../components/constants/companyStyles';

export const CompanySelector = ({ selectedCompanyId, onSelectCompany }) => {
  const { data: companies = [], isLoading, isError } = useCompanies();

  if (isLoading) return <div>جاري تحميل الشركات...</div>;
  if (isError) return <div>فشل في تحميل الشركات</div>;

  const allOption = {
    id: null,
    name: 'كل الشركات',
    subtitle: 'قارن الخيارات'
  };

  const fullList = [allOption, ...companies];

  return (
    <div className="mb-[38px] font-cairo">
      {/* هيدر القسم */}
      <div className="flex justify-between items-center mb-[15px]">
        <div className="flex items-center gap-[11px]">
          <span className="grid place-items-center w-9 h-9 rounded-[12px] bg-[var(--soft-teal)] text-[var(--primary)] text-[14px] font-black">
            01
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-[var(--text)] m-0">اختر شركة النقل</h3>
            <p className="text-[11px] text-[var(--muted)] m-0">حدد الشركة التي تفضلها، وسنعرض لك مواعيدها المتاحة</p>
          </div>
        </div>
        <div className='flex gap-1 justify-center items-center text-muted'>
          <span>02</span>
  <ArrowLeft className="w-3.5 h-3.5" />
  <span>اختار الوقت والمقعد</span>
        </div>
      </div>

      {/* شبكة أزرار الشركات */}
      <div className="grid grid-cols-3 min-[651px]:grid-cols-5  gap-[8px] min-[651px]:gap-[11px]">
        {fullList.map((comp) => {
          const isSelected = selectedCompanyId === comp.id;
          const isAll = comp.id === null;
          const letter = isAll ? '' : comp.name.trim().charAt(2);

          // جلب اللون والتقييم الخاص بهذه الشركة
          const styleConfig = getCompanyStyle(comp.id);

          return (
            <button
              key={comp.id ?? 'all'}
              type="button"
              onClick={() => onSelectCompany(comp.id)}
              className={`min-w-0 rounded-[13px] py-[12px] px-[5px] min-[651px]:p-6 flex flex-col items-center justify-center gap-[7px] border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[var(--primary)] bg-[var(--soft-teal)] shadow-[0_0_0_2px_rgba(16,177,155,0.08)]'
                  : 'border-[var(--border)] bg-[var(--surface)]'
              }`}
            >
              {isAll ? (
                <span className="w-[27px] h-[27px] grid place-items-center text-[var(--primary)]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7h8m-8 4h8m-6 4h4M5 3h14a2 2 0 012 2v12a2 2 0 01-2 2h-1v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2H9v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                  </svg>
                </span>
              ) : (
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[18px] shrink-0 ${styleConfig.badgeClass || styleConfig.bgBadge}`}
                >
                  {letter}
                </span>
              )}

              <span className="text-[10px] min-[651px]:text-[11px] font-black text-[var(--text)] text-center leading-[1.45]">
                {comp.name}
              </span>

              {/* النص الفرعي أو النجمة المفرغة مع التقييم */}
              <small className="text-[10px] text-[var(--muted)] leading-none flex items-center justify-center gap-1">
                {isAll ? (
                  comp.subtitle
                ) : (
                  <>
                    <Star
                      size={11}
                      className="text-[#E8A43D] shrink-0"
                      strokeWidth={2.2}
                      />
                      <span>{styleConfig.rating}</span>
                  </>
                )}
              </small>
            </button>
          );
        })}
      </div>
    </div>
  );
};