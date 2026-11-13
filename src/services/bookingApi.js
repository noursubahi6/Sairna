import axios from 'axios';

const BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';

// جلب تفاصيل رحلة محددة
export const fetchTripDetails = async (tripId) => {
  const { data } = await axios.get(`${BASE_URL}/trips/${tripId}`);
  return data;
};

// جلب حالة المقاعد للرحلة
export const fetchTripSeats = async (tripId) => {
  const { data } = await axios.get(`${BASE_URL}/trips/${tripId}/seats`);
  return data;
};
// تأكيد الحجز وإرساله للسيرفر
export const createBooking = async (bookingPayload) => {
  const token = localStorage.getItem("token"); // تأكدي من مفتاح التوكن

  const { data } = await axios.post(
    "https://sairna.abdulrahman-hares.com/api/v1/website/bookings",
    bookingPayload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
// جلب جميع حجوزات المستخدم المسجل
export const fetchMyBookings = async () => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  const { data } = await axios.get(
    "https://sairna.abdulrahman-hares.com/api/v1/website/bookings/me", // <-- أضفنا /me في النهاية
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data?.data || data?.bookings || data || [];
};