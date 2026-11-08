import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function FaqItem({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={` w-full border rounded-2xl transition-all duration-300 overflow-hidden ${
        isOpen ? "border-primary bg-surface shadow-xs" : "border-border bg-surface"
      }`}
    >
      {/* السطر الكامل: العنوان يمين والأيقونة يسار */}
      <button
        type="button"
        onClick={toggleOpen}
        className="w-full p-4 md:p-4 flex items-center justify-between cursor-pointer bg-transparent border-none focus:outline-none select-none text-right"
      >
        {/* العنوان على اليمين */}
        <span
          className={`text-sm  md:text-sm font-bold transition-colors ${
            isOpen ? "text-primary" : "text-text"
          }`}
        >
          {title}
        </span>

        {/* الأيقونة على اليسار */}
        <span
          className={`flex items-center justify-center transition-transform duration-200 shrink-0 ${
            isOpen ? "text-primary rotate-90" : "text-muted"
          }`}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>

      {/* المحتوى السفلي المنسدل (على اليمين تلقائياً) */}
      {isOpen && (
        <div className="px-4 md:px-3.5 pb-4 md:pb-5 pt-0 text-right">
          <div className="border-t border-border/40 pt-3 text-xs md:text-sm text-muted leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}