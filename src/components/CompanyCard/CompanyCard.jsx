import { Star, Wifi, Zap, Snowflake, ArrowLeft } from "lucide-react";
import Button from "../button/Button";

// خريطة ميزات مؤقتة تعتمد على ID الشركة لحين تحديث الـ Backend
const mockFeaturesMap = {
  1: [
    { key: "ac", label: "مكيف", icon: Snowflake },
    { key: "wifi", label: "Wi-Fi", icon: Wifi },
    { key: "usb", label: "شحن USB", icon: Zap },
  ],
  2: [
    { key: "ac", label: "مكيف", icon: Snowflake },
  ],
  3: [
    { key: "ac", label: "مكيف", icon: Snowflake },
    { key: "wifi", label: "Wi-Fi", icon: Wifi },
  ],
};

export default function CompanyCard({ company, onSelect }) {
  // استخراج أول حرف من اسم الشركة إذا لم يوجد شعار
  const firstLetter = company?.name ? company.name.charAt(2) : "ش";

  // تجميع الميزات: استخدام ميزات الباك إند إذا وجدت، أو الخريطة المؤقتة بناءً على الـ ID
  const amenities = company?.features || mockFeaturesMap[company?.id] || [
    { key: "ac", label: "مكيف", icon: Snowflake },
  ];

  return (
    <article
      className="group company-card relative bg-surface border border-border rounded-[20px] p-6 transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-xl font-cairo flex flex-col justify-between"
    >
      <div>
        {/* رأس الكرت (company-card-head): التقييم على اليسار والشعار على اليمين */}
        <div className="company-card-head flex items-start justify-between gap-2 mb-5">
          {/* شارة التقييم */}

          <div className="w-14 h-14 rounded-2xl bg-soft-teal flex items-center justify-center text-primary font-black text-2xl border border-primary/10 shrink-0">
            {company?.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={company.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <span>{firstLetter}</span>
            )}
          </div>
           <div className="inline-flex items-center gap-1 bg-soft-teal text-primary px-2.5 py-1 rounded-full text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current text-primary" />
            <span>5 / 4.9</span>
          </div>

        </div>

        {/* عنوان واسم الشركة والمعلومات */}
        <div className="">
          <h2 className="text-xl font-extrabold text-text mb-1 group-hover:text-primary transition-colors duration-200">
            {company?.name || "اسم الشركة"}
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            {company?.description || "رحلات منتظمة بين المحافظات وتجربة سفر مريحة."}
          </p>
        </div>

        {/* قائمة الميزات والخدمات (company-amenities) */}
        <div className="company-amenities flex flex-wrap gap-2 my-4">
          {amenities.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <span
                key={idx}
                className="service-pill inline-flex items-center gap-2 bg-surface-alt text-muted text-xs font-bold px-3 py-1.5 rounded-xl border border-border/50"
              >
                {IconComponent && <IconComponent className="w-3.5 h-3.5 text-primary shrink-0" />}
                <span>{item.label}</span>
              </span>
            );
          })}
        </div>

        {/* قسم البيانات السريعة (company-meta) */}
        <div className="company-meta grid grid-cols-2 gap-3 border-t border-border pt-4 pb-1 my-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <b className="text-base font-black text-text">12+</b>
            <small className="text-[10px] text-muted font-bold mt-0.5">وجهة تجريبية</small>
          </div>
          <div className="flex flex-col items-center justify-center">
            <b className="text-base font-black text-text">يومياً</b>
            <small className="text-[10px] text-muted font-bold mt-0.5">مواعيد متاحة</small>
          </div>
        </div>
      </div>

      {/* زر إجراء عرض رحلات الشركة باستخدام المكون الخاص بك */}
      <div className="mt-2">
        <Button
        to="/book"
          variant="outline"
          size="md"
          icon={ArrowLeft}
          iconPosition="right"
          className="w-full justify-center group-hover:border-primary   transition-all duration-300"
          onClick={() => onSelect && onSelect(company)}
        >
          عرض رحلات الشركة
        </Button>
      </div>
    </article>
  );
}