import { useState } from "react";
import { Mail, Eye, EyeOff, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import SectionBadge from "../../components/SectionBadge/SectionBadge";
import { useLogin } from "../../hooks/useAuth";
import DamImg from "../../assets/image.jpg";
import AuthForm from "../AuthForm";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // استخدام الـ hook الصحيح لتسجيل الدخول
  const { mutate: login, isPending, error } = useLogin();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, {
      onSuccess: (data) => {
        console.log("استجابة تسجيل الدخول:", data);

        // استخراج وحفظ التوكن بجميع الاحتمالات
        const token = data?.token || data?.access_token || data?.data?.token || data?.accessToken;

        if (token) {
          localStorage.setItem("token", token);
          console.log("تم حفظ التوكن بنجاح والانتقال للبروفايل");
          window.location.href = "/profile";
        } else {
          console.error("السيرفر لم يرجع token في الاستجابة:", data);
        }
      },
      onError: (err) => {
        console.error("خطأ بتسجيل الدخول:", err.message);
      }
    });
  };

  const formFields = [
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "email",
      placeholder: "name@example.com",
      value: formData.email,
      onChange: handleChange,
      required: true,
      autoComplete: "email",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      label: "كلمة المرور",
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "أحرف على الأقل 6",
      value: formData.password,
      onChange: handleChange,
      required: true,
      autoComplete: "current-password",
      icon: (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-muted hover:text-text transition-colors"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      ),
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-bg flex items-center justify-center p-4 md:p-6 font-cairo">
      <div className="w-full max-w-[1040px] bg-surface rounded-[28px] border border-border overflow-hidden shadow-sairna-md grid grid-cols-1 lg:grid-cols-2">

        <div className="p-8 md:p-12 flex flex-col justify-center items-center text-right bg-surface">
          <div className="w-full max-w-sm flex flex-col items-center">
            <div className="w-full flex justify-start mb-2">
              <SectionBadge size="sm">أهلاً برجوعك</SectionBadge>
            </div>

            <div className="w-full text-right mb-6">
              <h1 className="text-3xl font-black text-text">
                منوّر، <span className="text-primary">اشتقنالك!</span>
              </h1>
              <p className="text-xs text-muted mt-1">ادخل على حسابك وكمل رحلتك معنا.</p>
            </div>

            {error && (
              <div className="w-full mb-4 p-3 bg-red-100 text-red-600 text-xs rounded-xl text-center font-bold">
                {error.message}
              </div>
            )}

            <AuthForm
              fields={formFields}
              onSubmit={handleSubmit}
              submitText={isPending ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
              submitIcon={ArrowLeft}
              showTerms={true}
              termsText="تذكرني"
              showForgotPassword={true}
              forgotPasswordText="نسيت كلمة المرور؟"
              onForgotPasswordClick={() => (window.location.href = "/forgot-password")}
              isChecked={agree}
              onCheckChange={(e) => setAgree(e.target.checked)}
              footerText="لسا ما عندك حساب؟ "
              footerActionText="أنشئ حساب جديد"
              onFooterActionClick={() => (window.location.href = "/new-account")}
            />
          </div>
        </div>

        <div
          className="relative p-8 md:p-10 flex flex-col justify-between text-white overflow-hidden"
          style={{ background: "linear-gradient(145deg, #0e4653, #0b756e)" }}
        >
          <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 rounded-full border border-white/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-start text-right">
            <SectionBadge variant="white" size="sm" className="mb-4">
              عالم جديد بانتظارك
            </SectionBadge>
            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-2">كل الطرق بتوصّل لذكريات.</h2>
            <p className="text-white/80 text-xs leading-relaxed max-w-xs mb-6">ومن أول لحظة رح نكون معك.</p>

            <div className="w-full relative mt-2 group">
              <div className="w-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl transform -rotate-2 transition-transform duration-500 group-hover:rotate-0">
                <img src={DamImg} alt="Syria Landmark" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 pt-6 text-xs text-white/90">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#0e4653] bg-white rounded-full p-0.5" />
              <span>حجز مأمون ومؤكد</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <Zap className="w-4 h-4 text-[#0e4653] bg-white rounded-full p-0.5" />
              <span>بخُطوات بسيطة</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}