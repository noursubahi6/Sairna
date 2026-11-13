import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, GitBranch, Globe, ExternalLink, MapPin } from "lucide-react";
import PageHeader from "../../components/PAGhkjf/page-hero";
import Button from "../../components/button/Button";
import TripTrackingCard from "../../components/tracking/TripTrackingCard";
import { useMyBookings } from "../../hooks/useTripBooking";

export default function TrackPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // جلب حجوزات المستخدم كبديل في حال فتح صفحة /track مباشرة من القائمة العلوية
  const { data: myBookings = [] } = useMyBookings();

  // الأولوية للحجز القادم من زر "تتبع الرحلة"، ثم أول حجز للمستخدم
  const activeBooking = location.state?.booking || myBookings[0] || null;
  const trip = activeBooking?.trip || activeBooking || {};

  const originName = trip.origin?.name || trip.fromCity || "حلب";
  const destinationName = trip.destination?.name || trip.toCity || "دمشق";

  const googleMapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(
    originName,
  )}/${encodeURIComponent(destinationName)}`;

  return (
    <div className="container  pb-16 font-cairo" dir="rtl">
      {/* رأس الصفحة */}
      <PageHeader
        breadcrumb={[
          { name: "الرئيسية", path: "/" },
          { name: "حجوزاتي", path: "/my-bookings" },
          { name: "تتبع الرحلة" },
        ]}
        badgeIcon={GitBranch}
        badgeText="تابع الطريق"
        title="رحلتك قدام"
        titleHighlight="عيونك"
        subtitle="خط السير على الخريطة مع محطات ووقت وصول توضيحي."
        statusPill="محاكاة تفاعلية"
        actionButton={
          <Button
            variant="outline"
            size="md"
            icon={ArrowLeft}
            iconPosition="right"
            onClick={() => navigate("/my-bookings")}
          >
            كل الحجوزات
          </Button>
        }
      />

      {/* محتوى الصفحة: الخريطة على اليمين + بطاقة التتبع على اليسار */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* مكون بطاقة تتبع الرحلة (4 أعمدة) */}
          <div className="lg:col-span-4">
            <TripTrackingCard booking={activeBooking} />
          </div>
          {/* قسم الخريطة (8 أعمدة) */}
          <div className="lg:col-span-8 bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-4 shadow-[var(--shadow)]">
            <div className="relative w-full h-[540px] rounded-2xl bg-[#e6eee9] overflow-hidden flex items-center justify-center">
              {/* أزرار الخريطة العلوية */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 bg-white/95 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-xs">
                  <Globe className="w-4 h-4 text-[var(--primary)]" />
                  <span>عرض الخريطة</span>
                </span>
              </div>

              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-2 bg-white/95 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  <span>OpenFreeMap · خريطة تفاعلية</span>
                </span>
              </div>

              {/* مكان الخريطة التفاعلية */}
              <div className="text-center text-[var(--muted)] text-xs font-bold">
                خريطة المسار التفاعلية ({originName} ← {destinationName})
              </div>

              {/* أزرار الخريطة السفلية */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white/95 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>
                    {originName} ← {destinationName}
                  </span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 z-10 flex flex-col items-end gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>عرض الطريق في Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
