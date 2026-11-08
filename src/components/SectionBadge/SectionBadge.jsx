import { Sparkles } from 'lucide-react';
export default function SectionBadge({
  children,
  icon: Icon = Sparkles,
  className = ""
}) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-teal text-primary text-xs font-bold w-fit ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{children}</span>
    </div>
  );
}