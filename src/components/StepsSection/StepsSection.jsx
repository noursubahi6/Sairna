import { useState, useEffect } from "react";
import {  Search, Bus, Ticket } from "lucide-react";
import StepCard from "../StepCard/StepCard";
import SectionBadge from "../SectionBadge/SectionBadge";

export default function StepsSection() {
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".step-card-container")) {
        setActiveStep(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const stepsData = [
    {
      id: 1,
      number: "01",
      icon: Search,
      title: "اختر وجهتك",
      description: "حدد من وين لوين وتاريخ الرحلة المناسب إلك.",
      iconBgClass: "bg-teal-50",
      iconColorClass: "text-primary",
      activeBorderClass: "border-primary/50 ring-4 ring-primary/5",
      activeTextClass: "text-primary",
    },
    {
      id: 2,
      number: "02",
      icon: Bus,
      title: "لاقي رحلتك",
      description: "قارن الشركات والمواعيد والأسعار واختار الأفضل.",
      iconBgClass: "bg-orange-50",
      iconColorClass: "text-orange-400",
      activeBorderClass: "border-orange-400/50 ring-4 ring-orange-500/5",
      activeTextClass: "text-orange-400",
    },
    {
      id: 3,
      number: "03",
      icon: Ticket,
      title: "احجز مقعدك",
      description: "اختار مقعدك وأكد الحجز، وتذكرتك بتصير جاهزة.",
      iconBgClass: "bg-blue-50",
      iconColorClass: "text-blue-400",
      activeBorderClass: "border-blue-400/50 ring-4 ring-blue-500/5",
      activeTextClass: "text-blue-400",
    },
  ];

  return (
    <section className="py-16 bg-surface-alt font-cairo">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <SectionBadge>السفر صار أبسط</SectionBadge>
        <h2 className="text-3xl md:text-4xl font-black text-text tracking-tight mb-3">
          3 خطوات... <span className="text-primary">وتكون بالطريق</span>
        </h2>

        <p className="text-xs md:text-sm text-muted max-w-md mb-12">ما في داعي للتعقيد، كل شي مرتب بواجهة وحدة.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {stepsData.map((step) => (
            <div
              key={step.id}
              className="step-card-container"
              onClick={(e) => {
                e.stopPropagation();
                setActiveStep(step.id);
              }}
            >
              <StepCard
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
                iconBgClass={step.iconBgClass}
                iconColorClass={step.iconColorClass}
                activeBorderClass={step.activeBorderClass}
                activeTextClass={step.activeTextClass}
                isActive={activeStep === step.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
