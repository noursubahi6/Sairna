import { Info } from "lucide-react";
import Button from "../components/button/Button";

export default function AuthForm({
  fields = [],
  onSubmit,
  submitText = "إرسال",
  submitIcon,
  showTerms = true,
  termsText = "أوافق على استخدام بيانات تجريبية في هذا النموذج التعليمي.",
  isChecked,
  onCheckChange,
  footerText = "",
  footerActionText = "",
  showForgotPassword = false,
  forgotPasswordText = "نسيت كلمة المرور؟",
  onForgotPasswordClick,
  onFooterActionClick,
}) {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-bold text-text">{field.label}</label>
          {/* تم توحيد الـ wrapper ليطابق تصميم حقل الاسم الكامل تماماً */}
          <div className="relative flex items-center">
            {field.icon && (
              <span className="absolute right-3.5 text-muted flex items-center pointer-events-none">{field.icon}</span>
            )}
          <input
  type={field.type || "text"}
  name={field.name}
  value={field.value}
  onChange={field.onChange}
  placeholder={field.placeholder}
  required={field.required}
  autoComplete={field.autoComplete}
  style={{ backgroundColor: '#ffffff' }} // إضافة إجبارية بلون الأبيض الصريح
  className={`w-full bg-white border border-border rounded-xl py-3 text-xs text-text placeholder:text-muted focus:outline-none focus:border-primary transition-colors shadow-xs ${
    field.icon ? "pr-10" : "pr-4"
  } ${field.rightAction ? "pl-10" : "pl-4"}`}
/>
            {field.rightAction && <div className="absolute left-3.5 flex items-center">{field.rightAction}</div>}
          </div>
        </div>
      ))}

      {/* خانة الشروط */}
     <div className=" w-full flex justify-between items-center pt-1 text-xs ">
         {showTerms && (
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={onCheckChange}
            className="w-4 h-4 accent-primary rounded cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-muted cursor-pointer select-none">
            {termsText}
          </label>
        </div>
      )}
      {showForgotPassword && (
        <div className="">
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            {forgotPasswordText}
          </button>
        </div>
      )}
     </div>

      {/* زر الإرسال */}
      <div className="pt-2 w-full">
        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={submitIcon}
          className="w-full justify-center shadow-md font-bold"
        >
          {submitText}
        </Button>
      </div>

      {/* النصوص السفلية والتنبيه */}
      {footerText && (
        <div className="w-full pt-4 flex flex-col items-center text-center gap-3">
          <p className="text-xs text-muted">
            {footerText}{" "}
            <button
              type="button"
              onClick={onFooterActionClick}
              className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              {footerActionText}
            </button>
          </p>


          <div className="w-full bg-surface-alt border border-border/60 rounded-xl py-3 px-1 flex items-center justify-center gap-2 text-[10px] text-muted">
            <Info className="w-4 h-4 text-primary shrink-0" />
            <span>تسجيل الدخول والتسجيل محاكاة محلية فقط، بدون خادم أو تخزين كلمات المرور.</span>
          </div>
        </div>
      )}
    </form>
  );
}
