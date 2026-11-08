import { NavLink } from "react-router-dom";
import { Phone, Mail, Globe } from "lucide-react";
import logoImg from "../../assets/logo.svg";
import FooterColumn from "../footer-column/FooterColumn";

export default function Footer() {
  const exploreLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "احجز رحلتك", path: "/book" },
    { name: "شركات النقل", path: "/companies" },
    { name: "تتبع رحلتك", path: "/track" },
  ];

  const accountLinks = [
    { name: "تسجيل الدخول", path: "/login" },
    { name: "إنشاء حساب", path: "/register" },
    { name: "حجوزاتي", path: "/my-bookings" },
    { name: "الملف الشخصي", path: "/profile" },
  ];

  const helpLinks = [
    { name: "عن سيرنا", path: "/about" },
    { name: "مركز المساعدة", path: "/help" },
  ];

  return (
    <footer className="bg-dark-deep text-[#d2e4e9] pt-14 font-cairo dir-rtl">
      {/* الحاوية الرئيسية بنفس أبعاد الهيدر بالضبط */}
      <div className="container pb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.25fr] gap-10">

        {/* الشعار والوصف والأيقونات */}
        <div className="flex flex-col gap-4 items-start">
          <NavLink
            to="/"
            aria-label="سيرنا - الرئيسية"
            className="inline-flex items-center gap-3 shrink-0 no-underline text-inherit"
          >
            <span className="w-12 h-12 grid place-items-center">
              <img
                src={logoImg}
                alt="سيرنا"
                className="w-full h-full max-w-full align-middle"
              />
            </span>

            <span className="flex flex-col leading-tight">
              <strong className="text-3xl font-black tracking-tighter text-white">
                سيرنا<span className="text-primary">.</span>
              </strong>
              <small className="text-[9px] font-bold text-[#9ac4cd] whitespace-nowrap mt-1.5">
                رحلتك بتبلش من هون
              </small>
            </span>
          </NavLink>

          <p className="text-xs text-[#9cb4c0] max-w-[290px] leading-[2.1] my-4 font-bold">
            طريقة أجمل وأسهل للسفر بين المحافظات السورية. ابحث، اختار، واحجز بكل راحة.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl border border-[#335362] grid place-items-center text-[#cce9e9] hover:border-primary hover:text-primary transition-colors cursor-pointer">
              <Phone className="w-4 h-4" />
            </span>
            <span className="w-9 h-9 rounded-xl border border-[#335362] grid place-items-center text-[#cce9e9] hover:border-primary hover:text-primary transition-colors cursor-pointer">
              <Mail className="w-4 h-4" />
            </span>
            <span className="w-9 h-9 rounded-xl border border-[#335362] grid place-items-center text-[#cce9e9] hover:border-primary hover:text-primary transition-colors cursor-pointer">
              <Globe className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* الأعمدة الثلاثة */}
        <FooterColumn title="استكشف" links={exploreLinks} />
        <FooterColumn title="حسابك" links={accountLinks} />

        {/* عمود المساعدة */}
        <div className="flex flex-col items-start">
          <FooterColumn title="نحن هون لمساعدتك" links={helpLinks} />
          <a
            href="mailto:hello@sarna.example"
            className="flex items-center gap-2 text-[11px] font-bold text-[#a3c0ca] hover:text-primary transition-colors duration-200 mt-3.5 no-underline"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>hello@sarna.example</span>
          </a>
        </div>

      </div>

      {/* الشريط السفلي */}
      <div className="border-t border-[#1c3c4e] py-6">
        <div className="container text-center md:text-right text-[11px] text-[#7899a7] leading-relaxed">
          مصادر الصور (Wikimedia Commons):{" "}
          <a href="#" className="text-[#a3c0ca] underline hover:text-primary">دمشق / الهيرو — (CC BY 4.0) Vyacheslav Argenberg</a>
          {" • "}
          <a href="#" className="text-[#a3c0ca] underline hover:text-primary">حلب — Vyacheslav Argenberg (CC BY 4.0)</a>
          {" • "}
          <a href="#" className="text-[#a3c0ca] underline hover:text-primary">اللاذقية — (CC BY-SA 3.0) Ahmad Ahmad</a>
          {" • "}
          <a href="#" className="text-[#a3c0ca] underline hover:text-primary">حمص — (CC BY-SA 4.0) Dosseman</a>
          . تُحمل الصور عند الاتصال بالإينترنت؛ تُعرض الروابط البديلة عند فشل المصدر الأول.
        </div>
      </div>
    </footer>
  );
}