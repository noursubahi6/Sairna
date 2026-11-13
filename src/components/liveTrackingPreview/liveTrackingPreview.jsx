import { CheckCircle2, ArrowLeft, MapPin } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useCities } from "../../hooks/useCities";
import { useTripSearchStore } from "../../store/useTripSearchStore";
import Button from "../button/Button";

export default function LiveTrackingPreview() {
  const [searchParams] = useSearchParams();
  const { data: cities = [] } = useCities();

  const { originId: storeOriginId, destinationId: storeDestinationId } = useTripSearchStore();

  const originId = searchParams.get("originId") || storeOriginId || (cities[0]?.id ?? "");
  const destinationId = searchParams.get("destinationId") || storeDestinationId || (cities[1]?.id ?? "");

  const originCity =
    cities.find((c) => String(c.id) === String(originId))?.name || "حلب";
  const destinationCity =
    cities.find((c) => String(c.id) === String(destinationId))?.name || "دمشق";

  return (
    <section className="container my-12 font-cairo" dir="rtl">
      <div className="mx-auto">
        <div className="bg-surface border border-border rounded-[32px] overflow-hidden shadow-sairna flex flex-col lg:flex-row items-stretch transition-colors duration-300">

          {/* القسم الأيمن: النصوص */}
          <div className="relative lg:w-1/2 p-8 lg:p-12 flex flex-col items-start justify-center text-right overflow-hidden">
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-soft-teal text-primary text-xs font-bold mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>وين وصلت الرحلة؟</span>
            </div>

            <h2 className="relative z-10 text-3xl lg:text-4xl font-black text-text tracking-tight mb-3 leading-tight">
              الطريق قدامك... <br />
              <span className="text-primary">لحظة بلحظة؟</span>
            </h2>

            <p className="relative z-10 text-xs lg:text-sm text-muted leading-relaxed mb-6">
              بصفحة التتبع تشوف خط سير الرحلة ومحطاتها وحالتها ضمن نموذج تفاعلي سهل وواضح.
            </p>

            <div className="relative z-10 flex flex-col gap-3 mb-8 w-full">
              <div className="flex items-center gap-2.5 text-xs font-extrabold text-text">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>عرض المسار على الخريطة</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-extrabold text-text">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>وقت وصول تقديري ومحطات الطريق</span>
              </div>
            </div>

            <div className="relative z-10">
              <Button variant="primary" size="md" icon={ArrowLeft} to="/track">
                جرّب تتبع رحلة
              </Button>
            </div>

            <p className="relative z-10 text-[11px] text-muted/80 mt-4">
              * الخريطة وحركة الحافلة في هذا النموذج توضيحية وليست GPS مباشر.
            </p>
          </div>

          {/* القسم الأيسر: الخريطة مع الأسماء الديناميكية المختارة */}
          <div className="w-full lg:w-1/2 bg-surface-alt p-6 lg:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-border transition-colors duration-300">

            {/* شريط المعلومات العلوي */}
            <div className="flex items-center justify-between mb-4 text-xs font-bold text-muted">
              <span className="flex items-center gap-1.5 text-text">
                <MapPin className="w-3.5 h-3.5 text-primary" /> {originCity} – {destinationCity}
              </span>
              <span className="inline-flex items-center gap-1.5 text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                معاينة مسار رحلة
              </span>
            </div>

            {/* إطار الخريطة */}
            <div className="relative w-full h-[260px] lg:h-[300px] rounded-2xl overflow-hidden border border-border shadow-xs bg-surface">
              <iframe
                title="Sairna Trip Route Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831513.1458022718!2d36.55!3d35.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1525a772f8832c3f%3A0x46423984e26922d1!2sAleppo%2C%20Syria!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              ></iframe>
            </div>

            {/* شريط تقدم الرحلة السفلي (ديناميكي حسب الانطلاق والوصول) */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted font-bold px-1">
              {/* اليمين: مدينة الانطلاق */}
              <span className="flex items-center gap-1 text-text">
                <MapPin className="w-3.5 h-3.5 text-primary" /> {originCity}
              </span>

              <div className="flex-1 mx-4 h-1.5 bg-border rounded-full relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-primary rounded-full"></div>
              </div>

              {/* اليسار: مدينة الوصول */}
              <span className="flex items-center gap-1 text-text">
                <MapPin className="w-3.5 h-3.5 text-primary" /> {destinationCity}
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}