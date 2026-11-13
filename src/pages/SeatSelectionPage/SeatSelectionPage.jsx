import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BusSeatMap from "../../components/booking/BusSeatMap";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTripSearchStore } from "../../store/useTripSearchStore";
import { useTripBookingData } from "../../hooks/useTripBooking";
import Button from "../../components/button/Button";
import BookingSummaryCard from "../../components/booking/BookingSummaryCard";
import PageHeader from "../../components/PAGhkjf/page-hero"; // تأكدي من المسار

export default function SeatSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripId } = useParams();

  const { passengers: storePassengers } = useTripSearchStore();
  const passengersCount = Number(location.state?.passengers || storePassengers || 1);
  const initialTrip = location.state?.trip;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [authError, setAuthError] = useState("");

  const { trip: fetchedTrip, seatsData, isLoading, isError } = useTripBookingData(tripId);
  const trip = fetchedTrip || initialTrip;

  // استخراج أرقام المقاعد المحجوزة
  const rawOccupied =
    seatsData?.occupiedSeats ||
    seatsData?.bookedSeats ||
    seatsData?.data?.occupiedSeats ||
    seatsData?.data?.bookedSeats ||
    (Array.isArray(seatsData)
      ? seatsData
          .filter((s) => s.isOccupied || s.isBooked || s.status === "booked")
          .map((s) => s.seatNumber || s.number || s)
      : []) ||
    [];

  const occupiedSeatsList = rawOccupied.map((item) =>
    typeof item === "object" ? Number(item.seatNumber || item.number) : Number(item)
  );

  // دالة متابعة الحجز
  const handleContinueBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthError("عذراً، يجب تسجيل الدخول أولاً لمتابعة الحجز!");
      return;
    }

    navigate("/book/passengers", {
      state: {
        trip,
        selectedSeats,
        passengersCount,
      },
    });
  };

  if (isLoading && !trip) {
    return (
      <div className="text-center py-20 font-cairo font-bold text-[var(--primary)]">
        جاري تحميل مخطط المقاعد...
      </div>
    );
  }

  if (isError && !trip) {
    return (
      <div className="text-center py-20 font-cairo text-red-500">
        حدث خطأ أثناء جلب بيانات الرحلة.
      </div>
    );
  }

  const isComplete = selectedSeats.length === passengersCount;

  return (
    <div className="min-h-screen pb-16 font-cairo" dir="rtl">
      {/* 1. الهيدر العلوي المستدعى من PageHeader */}
      <PageHeader
        breadcrumb={[
          { name: "الرئيسية", path: "/" },
          { name: "الرحلات", path: "/book" },
          { name: "إتمام الحجز" },
        ]}
        badgeText="باقي شوي وتوصل"
        title="كمّل حجز"
        titleHighlight="رحلتك."
        className="border-b border-border/50 pb-8"
        actionButton={
          <Button
            variant="text"
            icon={ArrowRight}
            iconPosition="left"
            to="/book"
            className="text-muted hover:text-primary"
          >
            تغيير الرحلة
          </Button>
        }
      />

      {/* 2. المحتوى السفلي: شريط الخطوات + المخطط + ملخص الحجز */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        {/* شريط الخطوات */}
        <div className="flex items-center justify-center gap-4 my-8 text-xs font-bold">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <span className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-black">
              1
            </span>
            <span>اختيار المقاعد</span>
          </div>
          <div className="w-12 h-[1px] bg-[var(--border)]"></div>
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <span className="w-7 h-7 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
              2
            </span>
            <span>بيانات المسافرين</span>
          </div>
          <div className="w-12 h-[1px] bg-[var(--border)]"></div>
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <span className="w-7 h-7 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
              3
            </span>
            <span>المراجعة والتأكيد</span>
          </div>
        </div>

        {/* الشبكة الرئيسية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
           <BusSeatMap
  totalSeats={trip?.totalSeats || 44}
  occupiedSeats={occupiedSeatsList}
  passengersCount={passengersCount}
  selectedSeats={selectedSeats}
  setSelectedSeats={setSelectedSeats}
  onContinue={handleContinueBooking}
  authError={authError}
  onLoginClick={() => navigate("/login")}
/>ء 

            {/* أزرار التنقل السفلية */}

          </div>

          {/* ملخص الحجز */}
          <div className="lg:col-span-1">
            <BookingSummaryCard
              trip={trip}
              passengersCount={passengersCount}
              selectedSeats={selectedSeats}
            />
          </div>
        </div>
      </div>
    </div>
  );
}