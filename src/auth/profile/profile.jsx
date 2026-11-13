import { LogOut } from "lucide-react";
import { useProfile } from "../../hooks/useAuth";
import PageHeader from "../../components/PAGhkjf/page-hero";
import Button from "../../components/button/Button";

export default function ProfilePage() {
  // جلب بيانات المستخدم وعرض حالات التحميل أو الخطأ
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) {
    return <div className="text-center py-20 text-muted">جاري تحميل البيانات...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">حدث خطأ أثناء تحميل البيانات، يرجى تسجيل الدخول مجدداً.</div>
    );
  }

  // دالة تسجيل الخروج وحذف التوكن والتوجيه للصفحة الرئيسية
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-bg  flex flex-col font-cairo">
      {/* الترويسة العلوية */}
      <div
        className="
     border-b border-border"
      >
        <PageHeader
          breadcrumb={[{ name: "الرئيسية", path: "/" }, { name: "الملف الشخصي" }]}
          badgeText="ملفك الشخصي"
          title="أهلاً"
          titleHighlight={user?.name || "نور"} // عرض اسم المستخدم ديناميكياً
          description="هون كل التفاصيل المتعلقة بحسابك التجريبي."
          size="normal"
          breadcrumbPosition="top"
          showArch={true}
          archPosition="left"
        />
      </div>
      {/* محتوى كروت الحساب */}
      <div className="w-full  py-16  container z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* القسم الأيسر: كرت البروفايل المصغر */}
          <div className="lg:col-span-5 bg-surface border border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-sairna-md">
            {/* الحرف الأول من الاسم كأيقونة */}
            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-black mb-4">
              {user?.name ? user.name.charAt(0).toUpperCase() : "N"}
            </div>

            <h3 className="text-base font-black text-text mb-1">{user?.name || "مستخدم سيرنا"}</h3>

            <p className="text-xs text-muted mb-6" dir="ltr">
              {user?.email || "name@example.com"}
            </p>

            <div className="w-full flex flex-col gap-3">
              <div className="w-full bg-surface-alt border border-border/60 rounded-xl p-3 text-xs text-text font-bold flex items-center justify-center gap-2">
                <span>0 حجوزات محفوظة</span>
              </div>

              {/* استخدام مكون الـ Button الخاص بك لتسجيل الخروج */}
              <Button
                type="button"
                variant="outline"
                size="md"
                icon={LogOut}
                iconPosition="right"
                className="w-full justify-center   hover:bg-[oklch(57.974% 0.09535 189.369 / 0.334)] hover:border-primary font-bold"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </Button>
            </div>
          </div>

          {/* القسم الأيمن: معلومات الحساب */}
          <div className="lg:col-span-7 bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-sairna-md">
            <h3 className="text-lg font-black text-text mb-6 text-right">معلومات الحساب</h3>

            <div className="flex flex-col gap-6">
              {/* الاسم الكامل */}
              <div className="flex justify-between items-center border-b border-border/60 pb-4">
                <span className="text-xs text-muted">الاسم الكامل</span>
                <span className="text-xs font-bold text-text">{user?.name || "غير متوفر"}</span>
              </div>

              {/* البريد الإلكتروني */}
              <div className="flex justify-between items-center border-b border-border/60 pb-4">
                <span className="text-xs text-muted">البريد الإلكتروني</span>
                <span className="text-xs font-bold text-text" dir="ltr">
                  {user?.email || "غير متوفر"}
                </span>
              </div>

              {/* نوع الحساب */}
              <div className="flex justify-between items-center pb-2">
                <span className="text-xs text-muted">نوع الحساب</span>
                <span className="text-xs font-bold text-primary">حساب تجريبي</span>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="primary"
                size="md"
                className=" justify-center shadow-md font-bold"
                onClick={() => (window.location.href = "/my-bookings")}
              >
                التنقل لحجزاتي
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
