  import { Link } from "react-router-dom"; // استبدليها بـ import Link from "next/link"; لو عم تشتغلي Next.js

export default function Button({
  children,
  text,
  icon: Icon,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  iconPosition = "right",
  to, // أو href للروابط والمسارات
  href,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 font-extrabold whitespace-nowrap border transition-all duration-300 ease-in-out cursor-pointer active:scale-95";

  const variants = {
    dark: "bg-dark text-white border-transparent hover:bg-dark-deep shadow-sairna",
    primary: "bg-primary text-white border-transparent hover:bg-primary-deep shadow-sairna",
    outline: "bg-surface-alt text-text border-border hover:border-primary hover:text-primary transition-colors",
    text: "bg-transparent text-text border-transparent hover:text-primary p-0 shadow-none",
  };

  const sizes = {
    sm: "min-h-10 py-2 px-4 text-xs rounded-xl",
    md: "min-h-12 py-3 px-5 text-xs rounded-xl",
    icon: "w-10 h-10 p-0 text-xs rounded-xl",
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${
    sizes[size] || sizes.md
  } ${className}`;

  // محتوى الزر الداخلي
  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}

      <span>{text || children}</span>

      {Icon && iconPosition === "right" && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
    </>
  );

  // تحديد الـ Path الممرر
  const path = to || href;

  // إذا تم تمرير مسار، يتعامل كـ Link
  if (path) {
    return (
      <Link to={path} className={combinedClasses} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  // وإلا يتعامل كـ button عادي
  return (
    <button type={type} onClick={onClick} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}