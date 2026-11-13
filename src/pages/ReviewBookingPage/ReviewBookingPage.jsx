import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "../../components/PAGhkjf/page-hero";
import Button from "../../components/button/Button";
import BookingSummaryCard from "../../components/booking/BookingSummaryCard";
import BookingReviewCard from "../../components/booking/BookingReviewCard";
import BookingSuccessCard from "../../components/booking/BookingSuccessCard";
import { useCreateBooking } from "../../hooks/useTripBooking";

export default function BookingReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    trip,
    selectedSeats = [],
    passengersCount = 1,
    passengersData = [],
  } = location.state || {};

  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const { mutate: submitBooking, isPending } = useCreateBooking();

  // حماية الصفحة إذا دخل المستخدم مباشرة بدون بيانات
  useEffect(() => {
    if (!trip || passengersData.length === 0) {
      navigate("/book");
    }
  }, [trip, passengersData, navigate]);

  // دالة الضغط على زر "تأكيد الحجز"
  const handleConfirmBooking = () => {
    setErrorMessage("");

    // 1. التحقق هل المستخدم مسجل دخول؟
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: {
          from: "/book/review",
          bookingState: { trip, selectedSeats, passengersCount, passengersData },
        },
      });
      return;
    }

    // 2. تجهيز البيانات وإرسالها للسيرفر كأرقام صحيحة
    const payload = {
      tripId: Number(trip.id),
      seats: passengersData.map((p) => ({
        seatNumber: Number(p.seatNumber),
        passengerName: p.passengerName.trim(),
        passengerPhone: p.passengerPhone.trim(),
      })),
    };

    submitBooking(payload, {
      onSuccess: (response) => {
        const code =
          response?.bookingCode ||
          response?.code ||
          response?.data?.code ||
          `SR-${String(
            response?.id || Math.floor(100000 + Math.random() * 900000)
          ).padStart(7, "0")}`;

        setConfirmedBooking({
          code,
          data: response,
        });
      },
      onError: (error) => {
        // إذا انتهت صلاحية التوكن (401)، نرسله لصفحة الدخول
        if (error?.response?.status === 401) {
          navigate("/login", {
            state: {
              from: "/book/review",
              bookingState: { trip, selectedSeats, passengersCount, passengersData },
            },
          });
          return;
        }

        // ترجمة أخطاء الباك إند الشائعة للعربية
        const rawMsg = error?.response?.data?.message || "";
        const msgText = Array.isArray(rawMsg) ? rawMsg.join("، ") : String(rawMsg);

        if (msgText.includes("SEAT_ALREADY_RESERVED")) {
          setErrorMessage("عذراً، هذا المقعد تم حجزه مسبقاً. يرجى العودة واختيار مقعد آخر.");
        } else if (msgText.includes("TRIP_ALREADY_DEPARTED")) {
          setErrorMessage("عذراً، لقد انطلقت هذه الرحلة بالفعل ولا يمكن الحجز عليها.");
        } else {
          setErrorMessage(msgText || "حدث خطأ أثناء تأكيد الحجز، يرجى المحاولة مرة أخرى.");
        }
      },
    });
  };

  if (!trip) return null;

  // 3. في حال تم تأكيد الحجز بنجاح: نعرض شاشة "يا سلام! تم تأكيد حجزك."
  if (confirmedBooking) {
    return (
      <div
        className="min-h-screen bg-[var(--surface-alt)] py-12 px-4 font-cairo flex items-center justify-center"
        dir="rtl"
      >
        <BookingSuccessCard
          bookingCode={confirmedBooking.code}
          trip={trip}
          selectedSeats={selectedSeats}
        />
      </div>
    );
  }

  // 4. الشاشة الافتراضية قبل التأكيد (المراجعة + ملخص الحجز)
  return (
    <div className="min-h-screen bg-[var(--surface-alt)] pb-16 font-cairo" dir="rtl">
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

      <div className="max-w-6xl mx-auto px-4 pt-4">
        {/* شريط الخطوات */}
        <div className="flex items-center justify-center gap-4 my-8 text-xs font-bold">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <span className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
              <Check className="w-4 h-4" strokeWidth={3} />
            </span>
            <span>اختيار المقاعد</span>
          </div>

          <div className="w-12 h-[1px] bg-[var(--primary)]"></div>

          <div className="flex items-center gap-2 text-[var(--primary)]">
            <span className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
              <Check className="w-4 h-4" strokeWidth={3} />
            </span>
            <span>بيانات المسافرين</span>
          </div>

          <div className="w-12 h-[1px] bg-[var(--primary)]"></div>

          <div className="flex items-center gap-2 text-[var(--primary)]">
            <span className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-black">
              3
            </span>
            <span>المراجعة والتأكيد</span>
          </div>
        </div>

        {/* الشبكة الرئيسية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BookingReviewCard
              passengersData={passengersData}
              onBack={() => navigate(-1)}
              onConfirm={handleConfirmBooking}
              isSubmitting={isPending}
              errorMessage={errorMessage}
            />
          </div>

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