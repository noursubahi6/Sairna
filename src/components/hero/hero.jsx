import { CheckCircle2, Star} from "lucide-react";
import HeroVisual from "../hero-visual/HeroVisual";
import TripSearchForm from "../../search/TripSearchForm";
import SectionBadge from "../SectionBadge/SectionBadge";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-[140deg] from-surface-alt to-bg  pt-16 font-cairo transition-colors duration-300">
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-9 items-center min-h-[420px]">
          <div className="flex flex-col items-start z-10">
<SectionBadge>
  أهلاً فيك بسيرنا
</SectionBadge>
            <h1 className="text-[clamp(48px,5.15vw,79px)] mt-5 mb-3 tracking-tight leading-snug font-black text-text">
              المحطة الجاية؟ <br />
              <span className="bg-[linear-gradient(93deg,#078a91,#15ba9d_75%)] bg-clip-text text-transparent">
                على كيفك.
              </span>
            </h1>

            <p className="text-base leading-relaxed max-w-[485px] mb-6 text-muted font-bold">
              من حلب لدمشق، ومن الساحل للجزيرة. لاقي الرحلة اللي بتناسبك، اختار مقعدك، وحلّي الطريق علينا.
            </p>

            <div className="flex items-center gap-4 text-xs font-bold text-text mb-6 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>حجز سهل</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>خيارات متنوعة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>متابعة رحلتك</span>
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <div className="flex -space-x-3 space-x-reverse">
                <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center border-2 border-bg">
                  م
                </span>
                <span className="w-8 h-8 rounded-full bg-teal-200 text-teal-900 text-xs font-bold flex items-center justify-center border-2 border-bg">
                  س
                </span>
                <span className="w-8 h-8 rounded-full bg-rose-200 text-rose-900 text-xs font-bold flex items-center justify-center border-2 border-bg">
                  ع
                </span>
                <span className="w-8 h-8 rounded-full bg-blue-200 text-blue-900 text-xs font-bold flex items-center justify-center border-2 border-bg">
                  ر
                </span>
              </div>

              <div className="flex flex-col text-right">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-text">4.9/5</span>
                  <div className="flex text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </div>
                </div>
                <small className="text-[10px] text-muted font-bold">تجربة سفر بتستاهل تجرّبها</small>
              </div>
            </div>
          </div>

          <div className="w-full">
            <HeroVisual />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-10 relative z-20">
        <TripSearchForm />
      </div>

      <div className="border-y border-border/60 bg-surface/40 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-text">24/7</span>
              <span className="text-xs text-muted font-bold mt-1">سهولة الوصول للتوفر</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-text">30+</span>
              <span className="text-xs text-muted font-bold mt-1">خيار رحلة باليوم</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-text">4</span>
              <span className="text-xs text-muted font-bold mt-1">شركات نقل تجريبية</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-text">14</span>
              <span className="text-xs text-muted font-bold mt-1">محافظة سورية</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}