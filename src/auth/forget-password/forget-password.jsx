import { Headphones } from "lucide-react";
import PageHeader from "../../components/PAGhkjf/page-hero";
import Button from "../../components/button/Button";
import FaqItem from "../../components/FaqItem/FaqItem";

export default function FAQ() {
  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-bg flex flex-col font-cairo">

    <div className="bg-gradient-to-[140deg] from-surface-alt to-bg  border-b border-border ">
          {/* الترويسة العلوية مع مسار التنقل والشارة */}
      <PageHeader
        breadcrumb={[
          { name: "الرئيسية", path: "/" },
          { name: "الأسئلة الشائعة" }
        ]}
        badgeText="نحن معك"
        title="شو حابب"
        titleHighlight="تعرف؟"
        description="أسئلة بتساعدك تستخدم نموذج سيرنا بسهولة."
        size="normal"
        breadcrumbPosition="top"
        showArch={true}
        archPosition="left"
      />

    </div>
      {/* المحتوى الرئيسي للأسئلة وكرت المساعدة */}
      <div className="container w-full   py-12 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-18 items-start">
   {/* قسم الأسئلة الشائعة (على اليسار) */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            <FaqItem title="كيف بحجز رحلة؟">
              حجز الرحلة بتم بخطوات بسيطة: بتختار مدينة الانطلاق والوصول، بتحدد الموعد المناسب، وبتأكد الحجز بخطوة وحدة لتكون مقعدك جاهز.
            </FaqItem>

            <FaqItem title="في دفع إلكتروني حقيقي؟">
              لا، الموقع نموذج تدريبي، وخيارات الدفع معروضة لأغراض التصميم فقط.
            </FaqItem>

            <FaqItem title="الخريطة بتعرض مكان الباص الحقيقي؟">
              الخريطة بتعرض مسار تقريبي ومحاكاة لحركة الباص لأغراض تجريبية وتوضيح آلية عمل تتبع GPS.
            </FaqItem>

            <FaqItem title="وين بلاقي حجزاتي؟">
              بتقدر تلاقي كل حجزاتك وتفاصيل رحلاتك عبر الانتقال إلى صفحة "حجزاتي" من القائمة الرئيسية.
            </FaqItem>

            <FaqItem title="هل في حسابات حقيقية؟">
              جميع الحسابات وعمليات التسجيل هي محاكاة محلية لأغراض التدريب والواجهات التعليمية فقط.
            </FaqItem>

          </div>

          {/* كرت "بحاجة لمساعدة؟" (يظهر على اليمين في الواجهات العربية) */}
          <div className="lg:col-span-4 bg-surface-alt border border-border/60 rounded-2xl p-6 flex flex-col items-start  shadow-xs">
            <div className="text-primary flex items-center justify-center mb-4">
              <Headphones className="w-10 h-10" />
            </div>

            <h3 className="text-base font-black text-text mb-2">
              بحاجة لمساعدة؟
            </h3>

            <p className="text-xs text-muted leading-relaxed mb-6">
              هاد الموقع نموذج تدريبي واجهات تعليمية، وممكن نتطوره لاحقاً لضيفوا نظام دعم حقيقي.
            </p>

            <div className="w-full">
              <Button
                variant="primary"
                size="md"
                className="flex items-start shadow-md font-bold"
                onClick={() => (window.location.href = "/")}
              >
                رجوع للرئيسية
              </Button>
            </div>
          </div>


        </div>
      </div>

    </div>
  );
}