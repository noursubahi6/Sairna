import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/homePage/HomePage";
import Companies from "./pages/companies/Companies";
import MyBookings, { MyBookingsPage } from "./pages/myBookings/MyBookings";
import Track from "./pages/track/Track";
import Book from "./pages/book/Book";
import LoginPage from "./auth/login/login-page";
import NewAccount from "./auth/new-account/new-account";
import ForgetPassword from "./auth/forget-password/forget-password";
import ProfilePage from "./auth/profile/profile";
import { PassengerDetailsPage } from "./pages/PassengerDetailsPage/PassengerDetailsPage";
import { ReviewBookingPage } from "./pages/ReviewBookingPage/ReviewBookingPage";
import { SeatSelectionPage } from "./pages/SeatSelectionPage/SeatSelectionPage";
import { BookingSuccessPage } from "./pages/BookingSuccessPage/BookingSuccessPage";

function App() {
  return (
    <Routes>
      {/* الـ Layout يغلف كل الروابط الداخلية ويظهر الهيدر والفوتر ثابتين ويغير الـ Outlet حسب الصفحة */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<Book />} />
        {/* مسار صفحة اختيار المقاعد الديناميكي */}
        <Route path="/book/seats/:tripId" element={<SeatSelectionPage />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/track" element={<Track />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-account" element={<NewAccount />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        // مثال على مسارات الحجز في ملف التوجيه لديك:
<Route path="/book" element={<Book />} />
<Route path="/book/seats/:id" element={<SeatSelectionPage />} />
<Route path="/book/passengers" element={<PassengerDetailsPage />} />
<Route path="/book/review" element={<ReviewBookingPage />} />
<Route path="/book/success" element={<BookingSuccessPage />} />
<Route path="/my-bookings" element={<MyBookingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;