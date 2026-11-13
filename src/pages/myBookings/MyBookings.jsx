import React from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/PAGhkjf/page-hero";
import Button from "../../components/button/Button";
import BookingTicketCard from "../../components/booking/BookingTicketCard";
import { useMyBookings } from "../../hooks/useTripBooking";

export default function MyBookingsPage() {
  const { data: bookings = [], isLoading, isError } = useMyBookings();

  return (
    <div className="min-h-screen  pb-16 font-cairo" dir="rtl">
      <div className="bg-surface-alt border-b border-border">
        <PageHeader
          breadcrumb={[{ name: "الرئيسية", path: "/" }, { name: "حجوزاتي" }]}
          badgeText="كل رحلتك بمكان واحد  "
          title="تذاكرك"
          titleHighlight="دايماً معك ."
          subtitle="راقب حجوزاتك وارجع لتفاصيل الرحلة وقت ما تحتاج "
        />
      </div>
      <div className="container">
        {" "}
        <div className="flex  justify-between items-center pt-20">
          <div>
            <h1>رحلاتي القادمة</h1>
            <p> رحلاتك محفوظة على هذا المتصفح</p>
          </div>
          <Button variant="primary" size="md" icon={Plus} iconPosition="right" to="/book">
            حجز جديد
          </Button>
        </div>
        <div className="py-5">
          {isLoading ? (
            <div className="text-center py-16 font-bold text-[var(--primary)]">جاري تحميل حجوزاتك...</div>
          ) : isError ? (
            <div className="text-center py-16 font-bold text-red-500">حدث خطأ أثناء تحميل الحجوزات.</div>
          ) : bookings.length === 0 ? (
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
              <p className="text-[var(--muted)] font-bold mb-4">ما عندك أي حجوزات حالياً.</p>
              <Button variant="primary" size="md" to="/book">
                احجز رحلتك الأولى
              </Button>
            </div>
          ) : (
            bookings.map((booking) => <BookingTicketCard key={booking.id || booking.bookingCode} booking={booking} />)
          )}
        </div>
      </div>
    </div>
  );
}
