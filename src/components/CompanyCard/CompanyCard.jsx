import { Star, Wifi, Zap, Snowflake, ArrowLeft } from "lucide-react";
import { getCompanyStyle } from "../constants/companyStyles";
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
    { key: "seats", label: "مقاعد واسعة", icon: Zap },
  ],
  3: [
    { key: "ac", label: "مكيف", icon: Snowflake },
    { key: "wifi", label: "Wi-Fi", icon: Wifi },
  ],
  4: [
    { key: "ac", label: "مكيف", icon: Snowflake },
    { key: "usb", label: "شحن USB", icon: Zap },
  ],
};

// دالة مساعدة لربط اسم الشركة بالـ ID الخاص بها في ملف الستايلات في حال الاعتماد على الاسم
const resolveCompanyId = (company) => {
  const name = company?.name || "";
  if (name.includes("الشام")) return 1;
  if (name.includes("الفرات")) return 2;
  if (name.includes("النورس")) return 3;
  if (name.includes("الاتحاد")) return 4;
  return company?.id;
};

export default function CompanyCard({ company, onSelect }) {
  // تحديد الـ ID الفعلي وجلب الستايل المطابق له
  const resolvedId = resolveCompanyId(company);
  const style = getCompanyStyle(resolvedId);

  // استخراج أول حرف من اسم الشركة (تخطي "ال" التعريف إن وجدت)
  const cleanName = company?.name ? company.name.replace(/^ال/, "") : "ش";
  const firstLetter = cleanName.charAt(0);

  // التقييم من 5 (يأخذه من الباك إند إن وجد، وإلا من ملف الستايلات)
  const rating = company?.rating || style.rating;

  // تجميع الميزات
  const amenities = company?.features || mockFeaturesMap[resolvedId] || [
    { key: "ac", label: "مكيف", icon: Snowflake },
  ];

  return (
    <article
      className="group company-card relative bg-surface border border-border rounded-[20px] p-6 transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-xl font-cairo flex flex-col justify-between"
    >
      <div>
        {/* رأس الكرت: الشعار الملون على اليمين وشارة التقييم على اليسار */}
        <div className="company-card-head flex items-start justify-between gap-2 mb-5">
          {/* مربع الشعار أو الحرف الأول بألوان الشركة */}
          <div
            className={`w-12 h-16 rounded-2xl flex items-center justify-center font-black text-3xl shrink-0 transition-transform duration-300 group-hover:scale-105 ${style.bgBadge}`}
          >
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

          {/* شارة التقييم من 5 مطابقة للصورة */}
          <div className="inline-flex items-center gap-1 bg-[#d5f5ef] text-[#0d9488] px-2 py-1 rounded-full text-xs font-extrabold">
            <Star className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{rating} / 5</span>
          </div>
        </div>

        {/* عنوان واسم الشركة والمعلومات */}
        <div>
          <h2 className="text-xl font-extrabold text-text mb-1.5 group-hover:text-primary transition-colors duration-200">
            {company?.name || "اسم الشركة"}
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            {company?.description || "رحلات منتظمة بين المحافظات وتجربة سفر مريحة."}
          </p>
        </div>

        {/* قائمة الميزات والخدمات */}
        <div className="company-amenities flex flex-wrap gap-2 mt-15">
          {amenities.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <span
                key={idx}
                className="service-pill inline-flex items-center gap-1.5 bg-surface-alt text-muted text-xs font-bold px-3 py-1.5 rounded-xl border border-border/50"
              >
                {IconComponent && (
                  <IconComponent className="w-3.5 h-3.5 text-muted shrink-0" />
                )}
                <span>{item.label}</span>
              </span>
            );
          })}
        </div>

        {/* قسم البيانات السريعة */}
        <div className="company-meta grid grid-cols-2 gap-3 border-t border-border pt-4 pb-1 my-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <b className="text-base font-black text-text">12+</b>
            <small className="text-[10px] text-muted font-bold mt-0.5">
              وجهة تجريبية
            </small>
          </div>
          <div className="flex flex-col items-center justify-center">
            <b className="text-base font-black text-text">يومياً</b>
            <small className="text-[10px] text-muted font-bold mt-0.5">
              مواعيد متاحة
            </small>
          </div>
        </div>
      </div>

      {/* زر إجراء عرض رحلات الشركة */}
      <div className="mt-2">
        <Button
          to="/book"
          variant="outline"
          size="md"
          icon={ArrowLeft}
          iconPosition="right"
          className={`w-full justify-center transition-all duration-300 group-hover:${style.borderColor}`}
          onClick={() => onSelect && onSelect(company)}
        >
          عرض رحلات الشركة
        </Button>
      </div>
    </article>
  );
}