import { MapPin, ShieldCheck } from "lucide-react";
import FloatingCard from "../floating-card/FloatingCard";
import DasImage from "../../assets/image.jpg";

export default function HeroVisual() {
  return (
    <div className="relative min-w-0 py-2.5 px-5">
      <div className="relative   rotate-[-1.5deg]">
        <FloatingCard
          title="14 محافظة"
          subtitle="وجهات بتجمعنا"
          icon={MapPin}
          positionClass="left-[-20px] top-[25px]"
        />

        <div className="relative rounded-[28px] overflow-hidden bg-slate-900">
          <img
            src={DasImage}
            alt="صورة حقيقية من دمشق"
            className="w-full h-auto object-cover aspect-4/3"
          />

          <div className="absolute bottom-[17px] left-[18px] z-10 inline-flex items-center gap-1.5 bg-[rgba(12,43,53,0.85)] text-white px-3 py-1 rounded-lg text-[10px] font-bold">
            صورة حقيقية من دمشق
          </div>
        </div>

        <FloatingCard
          title="سافر براحة"
          subtitle="من أول حجز لآخر محطة"
          icon={ShieldCheck}
          positionClass="right-[-22px] bottom-[45px]"
        />
      </div>
    </div>
  );
}