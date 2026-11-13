import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "../../components/PAGhkjf/page-hero";
import Button from "../../components/button/Button";
import BookingSummaryCard from "../../components/booking/BookingSummaryCard";
import PassengerDetailsForm from "../../components/booking/PassengerDetailsForm";

export default function PassengerDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { trip, selectedSeats = [], passengersCount = 1 } = location.state || {};

  const [passengersData, setPassengersData] = useState(() =>
    selectedSeats.map((seatNum) => ({
      seatNumber: Number(seatNum),
      passengerName: "",
      passengerPhone: "",
    }))
  );

  useEffect(() => {
    if (!trip || selectedSeats.length === 0) {
      navigate("/book");
    }
  }, [trip, selectedSeats, navigate]);

  const handleContinueToReview = () => {
    navigate("/book/review", {
      state: {
        trip,
        selectedSeats,
        passengersCount,
        passengersData,
      },
    });
  };

  if (!trip) return null;

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
            <span className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-black">
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
          <div className="lg:col-span-2">
            <PassengerDetailsForm
              selectedSeats={selectedSeats}
              passengersData={passengersData}
              setPassengersData={setPassengersData}
              onBack={() => navigate(-1)}
              onSubmit={handleContinueToReview}
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