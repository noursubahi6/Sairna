import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, Sparkles, ArrowLeft } from "lucide-react";
import logoImg from "../../assets/logo.svg";
import Button from "../button/Button";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "احجز رحلة", path: "/book" },
    { name: "شركات النقل", path: "/companies" },
    { name: "حجوزاتي", path: "/my-bookings" },
    { name: "تتبع الرحلة", path: "/track" },
  ];

  return (
    <header className="w-full font-cairo bg-surface text-text dir-rtl border-b border-border">
      <div className="bg-dark text-[#d4f2ec] text-xs py-2 px-4 flex items-center justify-center gap-2 font-bold tracking-wide">
        <span className="w-2 h-2 rounded-full bg-primary inline-block shadow-[0_0_0_4px_rgba(88,215,187,0.12)]"></span>
        <span>رحلات بين المدن السورية بصلوات بسيطة وواضحة</span>
        <Sparkles className="w-3.5 h-3.5 inline-flex items-center justify-center text-amber-400" />
      </div>

      <div className="container py-3 flex items-center justify-between">

        <NavLink
          to="/"
          aria-label="سيرنا - الرئيسية"
          className="inline-flex items-center gap-2.5 shrink-0 no-underline text-inherit"
        >
          <span className="w-12 h-12 grid place-items-center">
            <img src={logoImg} alt="سيرنا" className="w-full h-full max-w-full align-middle" />
          </span>

          <span className="flex flex-col leading-tight">
            <strong className="text-3xl font-black tracking-tighter text-text">
              سيرنا
              <span className="text-primary">.</span>
            </strong>
            <small className="text-[9px] font-bold text-muted whitespace-nowrap mt-2.5">
              رحلتك بتبلش من هون
            </small>
          </span>
        </NavLink>

        {/* قائمة الناف بار */}
        <nav aria-label="التنقل الرئيسي" className="hidden md:flex items-center gap-8 mx-auto max-[1150px]:gap-4">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `relative py-3 px-0 text-xs font-bold whitespace-nowrap transition-colors duration-300 ease-in-out max-[1150px]:text-[11px] ${
                  isActive ? "text-text" : "text-muted hover:text-text"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span
                    className={`absolute bottom-0 right-0 left-0 h-1 bg-primary rounded-full transition-all duration-300 ease-out origin-center ${
                      isActive ? "opacity-100 scale-x-100 translate-y-0" : "opacity-0 scale-x-0 translate-y-1"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* قسم الأزرار */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Button

            variant="outline" size="icon" onClick={toggleTheme} aria-label="تبديل المظهر">
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:text-primary transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
              )}
            </Button>

            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-dark text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap z-50">
              تبديل المظهر
            </span>
          </div>

          <NavLink to="/login">
            <Button variant="text" className="text-xs font-extrabold hover:text-primary">
              دخول
            </Button>
          </NavLink>

          <NavLink
            to="/new-account"
            className="inline-block transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 group"
          >
            <Button
              variant="dark"
              size="sm"
              icon={ArrowLeft}
              iconPosition="right"
              text="إنشاء حساب"
              className="text-xs font-extrabold group-hover:bg-dark-deep transition-colors duration-300"
            />
          </NavLink>
        </div>

      </div>
    </header>
  );
}