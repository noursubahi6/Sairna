export default function StepCard({
  number,
  icon: Icon,
  title,
  description,
  iconColorClass,
  iconBgClass,
  activeBorderClass,
  activeTextClass,
  isActive,
}) {
  return (
    <div
      className={`group relative bg-surface rounded-[24px] p-8 transition-all duration-300 ease-in-out flex flex-col justify-between text-right font-cairo cursor-pointer border ${
        isActive
          ? `-translate-y-2.5 shadow-xl ${activeBorderClass}`
          : "border-border hover:-translate-y-1 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
            iconBgClass || "bg-soft-teal text-primary"
          } ${iconColorClass || ""}`}
        >
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <span
          className={`text-4xl font-black transition-colors ${
            isActive
              ? activeTextClass
              : "text-border group-hover:text-muted"
          }`}
        >
          {number}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-text mb-2">{title}</h3>
        <p className="text-xs text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}