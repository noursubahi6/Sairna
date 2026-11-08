
export default function FloatingCard({
  title,
  subtitle,
  icon: Icon,
  positionClass,
}) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-3 bg-white px-4 py-3 rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] pointer-events-none ${positionClass}`}
    >
      <div className="flex flex-col   ">
        {/* تحديد لون الخط بشكل صريح بـ text-slate-800 ليبقى داكناً ومقروءاً في الوضعين */}
        <b className="text-xs md:text-sm text-slate-800 font-black leading-tight">
          {title}
        </b>
        <small className="text-[10px] md:text-[11px] text-slate-500 font-bold mt-0.5">
          {subtitle}
        </small>
      </div>

      {Icon && (
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-[12px] bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      )}
    </div>
  );
}