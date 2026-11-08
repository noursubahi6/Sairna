import React from "react";
import { Sparkles, ChevronLeft } from "lucide-react";

export default function PageHeader({
  breadcrumb = [],
  badgeText,
  title,
  titleHighlight,
  description,
  actionButton,
  size = "normal", // خيارات الحجم: normal, large, compact للتحكم بالحجم الضخم
  breadcrumbPosition = "top", // "top" لوضعه فوق العنوان تماماً كما تفضلين في بعض الصفحات
  showArch = false,
  archPosition = "left",
  className = "",
}) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-[140deg] from-surface-alt to-bg pt-8 pb-12 font-cairo  border-border/40 ${className}`}>
      {/* زخرفة الأرش خلفية */}
      {showArch && (
        <div
          className={`absolute top-[-100px] w-80 h-80 rounded-full border border-primary/10 pointer-events-none ${
            archPosition === "left" ? "left-[-100px]" : "right-[-100px]"
          }`}
        />
      )}

      <div className="container relative z-10 flex flex-col gap-4">

        {/* مسار التنقل (إذا كان بمكان مخصص بالأعلى) */}
        {breadcrumb.length > 0 && breadcrumbPosition === "top" && (
          <nav className="flex items-center gap-1.5 text-xs text-muted font-bold w-fit">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.path ? (
                  <a href={item.path} className="hover:text-primary transition-colors">
                    {item.name}
                  </a>
                ) : (
                  <span className="text-text">{item.name}</span>
                )}
                {index < breadcrumb.length - 1 && (
                  <ChevronLeft className="w-3.5 h-3.5 text-muted/60" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* الشارة (Badge) مع الأيقونة الثابتة */}
        {badgeText && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-soft-teal text-primary text-xs font-bold w-fit shadow-xs">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{badgeText}</span>
          </div>
        )}

        {/* العنوان الرئيسي والوصف مع زر الإجراء في الشاشات الكبيرة */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1
              className={`font-black text-text tracking-tight leading-tight ${
                size === "large"
                  ? "text-3xl md:text-5xl lg:text-6xl"
                  : size === "compact"
                  ? "text-2xl md:text-3xl"
                  : "text-3xl md:text-4xl"
              }`}
            >
              {title} {titleHighlight && <span className="text-primary">{titleHighlight}</span>}
            </h1>

            {description && (
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* زر الإجراء المرن */}
          {actionButton && (
            <div className="shrink-0 self-start md:self-auto">
              {actionButton}
            </div>
          )}
        </div>

        {/* مسار التنقل (إذا كان بالأسفل قليلاً حسب التصميم) */}
        {breadcrumb.length > 0 && breadcrumbPosition === "bottom" && (
          <nav className="flex items-center gap-1.5 text-xs text-muted font-bold w-fit pt-2">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.path ? (
                  <a href={item.path} className="hover:text-primary transition-colors">
                    {item.name}
                  </a>
                ) : (
                  <span className="text-text">{item.name}</span>
                )}
                {index < breadcrumb.length - 1 && (
                  <ChevronLeft className="w-3.5 h-3.5 text-muted/60" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

      </div>
    </section>
  );
}