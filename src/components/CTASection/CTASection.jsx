import React from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../button/Button";
import PageHeader from "../PAGhkjf/page-hero";
import SectionBadge from "../SectionBadge/SectionBadge";

export default function CTASection() {
  return (
    <section className="container my-12 font-cairo">
      <div
        className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between rounded-[24px] px-[60px] py-[39px] gap-[38px] text-white shadow-sairna"
        style={{
          background: "linear-gradient(105deg, #0e4653, #0b756e)",
        }}
      >
        {/* الدائرة الأولى d1 */}
        <div
          className="absolute rounded-full border border-white/12 pointer-events-none"
          style={{ width: "230px", height: "230px", left: "22%", top: "-140px" }}
        />

        {/* الدائرة الثانية d2 */}
        <div
          className="absolute rounded-full border border-white/12 pointer-events-none"
          style={{ width: "430px", height: "430px", right: "30%", bottom: "-368px" }}
        />

        {/* زر الانتقال مع حركة الـ Hover الشفافة وواضح تماماً */}


        {/* استدعاء الـ PageHeader جوات الكرت مع تمرير كلاسز لتبييض لونه جوا البانر */}
        <div className="relative z-10 w-full md:w-auto flex-1 order-2 md:order-none">

          <SectionBadge>جاهز تغير جو؟</SectionBadge>
          <PageHeader
            title="الطريق الجاي"
            titleHighlight="بيناديك."
            description="دوّر على رحلة، واجز أول مقعد إلك."
            size="compact"
            className="!bg-transparent !border-none !p-0 [&_*]:text-white "
          />
        </div>
  <div className="relative z-10 shrink-0 order-1 md:order-none">
          <Button
            to="/book"
            variant="outline"
            size="md"
            icon={ArrowLeft}
            className="bg-white text-[#112f41] border-white hover:bg-white/20  hover:border-white/40 transition-all duration-300 shadow-md font-bold"
          >
            يلا نلاقى رحلة
          </Button>
        </div>
      </div>
    </section>
  );
}