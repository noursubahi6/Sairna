import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/homePage/HomePage";
import Companies from "./pages/companies/Companies";
import MyBookings from "./pages/myBookings/MyBookings";
import Track from "./pages/track/Track";
import Book from "./pages/book/Book"; // تأكدي من استيراد Book إذا كان موجوداً
import LoginPage from "./auth/login/login-page";
import NewAccount from "./auth/new-account/new-account";
import ForgetPassword from "./auth/forget-password/forget-password";
import ProfilePage from "./auth/profile/profile";

function App() {
  return (
    <Routes>
      {/* الـ Layout يغلف كل الروابط الداخلية ويظهر الهيدر والفوتر وثابتين ويغير الـ Outlet حسب الصفحة */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<Book />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/track" element={<Track />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-account" element={<NewAccount/>} />
        <Route path="/forgot-password" element={<ForgetPassword/>} />
        <Route path="/profile" element={<ProfilePage/>} />

      </Route>
    </Routes>
  );
}

export default App;
