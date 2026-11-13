import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Sun, Moon, Sparkles, ArrowLeft, ChevronDown, LogOut, Ticket, User } from "lucide-react";
import logoImg from "../../assets/logo.svg";
import Button from "../button/Button";

// دالة جلب بيانات الملف الشخصي من الباك إند
const fetchUserProfile = async (token) => {
  const { data } = await axios.get(
    "https://sairna.abdulrahman-hares.com/api/v1/website/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // يدعم رجوع البيانات داخل data أو مباشرة
  return data?.data || data?.user || data;
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const dropdownRef = useRef(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // قراءة التوكن من localStorage
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  // جلب بيانات المستخدم الحقيقية من السيرفر باستخدام useQuery عند وجود التوكن
  const { data: profileData } = useQuery({
    queryKey: ["userProfile", token],
    queryFn: () => fetchUserProfile(token),
    enabled: !!token, // يعمل فقط إذا كان المستخدم مسجل دخول
    staleTime: 1000 * 60 * 5, // حفظ البيانات بالذاكرة لمدة 5 دقائق
    retry: false,
  });

  // محاولة قراءة بيانات احتياطية من localStorage ريثما يكتمل الطلب من السيرفر
  let localUser = null;
  try {
    const saved = localStorage.getItem("user");
    if (saved) localUser = JSON.parse(saved);
  } catch {
    localUser = null;
  }

  const user = profileData || localUser;

  // إغلاق القائمة المنسدلة عند الضغط خارجها أو عند تغيير الصفحة
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    queryClient.removeQueries({ queryKey: ["userProfile"] });
    setIsDropdownOpen(false);
    navigate("/login");
  };

  // استخراج الاسم الحقيقي (أو الجزء الأول من الإيميل) وأول حرف منه للدائرة
  const rawName =
    user?.fullName ||
    user?.name ||
    user?.username ||
    (typeof user?.email === "string" ? user.email.split("@")[0] : "");

  const displayName = String(rawName || "حسابي");
  const firstLetter = displayName.trim().charAt(0).toUpperCase();

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "احجز رحلة", path: "/book" },
    { name: "شركات النقل", path: "/companies" },
    { name: "حجوزاتي", path: "/my-bookings" },
    { name: "تتبع الرحلة", path: "/track" },
  ];

  return (
    <header className="w-full font-cairo bg-surface text-text dir-rtl border-b border-border">
      {/* الشريط العلوي */}
      <div className="bg-dark text-[#d4f2ec] text-xs py-2 px-4 flex items-center justify-center gap-2 font-bold tracking-wide">
        <span className="w-2 h-2 rounded-full bg-primary inline-block shadow-[0_0_0_4px_rgba(88,215,187,0.12)]"></span>
        <span>رحلات بين المدن السورية بخطوات بسيطة وواضحة</span>
        <Sparkles className="w-3.5 h-3.5 inline-flex items-center justify-center text-amber-400" />
      </div>

      {/* محتوى الهيدر الرئيسي */}
      <div className="container py-3 flex items-center justify-between">
        {/* الشعار */}
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

        {/* روابط التنقل */}
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

        {/* أزرار المظهر + حالة المستخدم */}
        <div className="flex items-center gap-3">
          {/* زر تبديل الوضع الليلي/النهاري */}
          <div className="relative group">
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="تبديل المظهر">
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

          {/* إذا كان المستخدم مسجل دخول: يظهر اسمه الحقيقي والدائرة بأول حرف */}
          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 py-1 px-2 rounded-xl hover:bg-surface-alt transition-colors cursor-pointer"
              >
                {/* الدائرة بأول حرف من الاسم */}
                <span className="w-9 h-9 rounded-full bg-soft-teal text-primary font-black text-sm flex items-center justify-center shrink-0">
                  {firstLetter}
                </span>

                {/* الاسم الكامل */}
                <span className="text-xs font-extrabold text-text max-w-[140px] truncate">
                  {displayName}
                </span>

                {/* سهم القائمة */}
                <ChevronDown
                  className={`w-4 h-4 text-muted transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              {/* القائمة المنسدلة */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-surface border border-border rounded-2xl shadow-lg py-2 z-50">
                  <NavLink
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-text hover:bg-surface-alt hover:text-primary transition-colors"
                  >
                    <User className="w-4 h-4 text-primary" />
                    <span>الملف الشخصي</span>
                  </NavLink>

                  <NavLink
                    to="/my-bookings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-text hover:bg-surface-alt hover:text-primary transition-colors"
                  >
                    <Ticket className="w-4 h-4 text-primary" />
                    <span>حجوزاتي</span>
                  </NavLink>

                  <div className="my-1 border-t border-border"></div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* إذا لم يكن مسجل دخول: أزرار الدخول وإنشاء حساب */
            <>
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
                  icon={ArrowLeft}                  iconPosition="right"
                  text="إنشاء حساب"
                  className="text-xs font-extrabold group-hover:bg-dark-deep transition-colors duration-300"
                />
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}