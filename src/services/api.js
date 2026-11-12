import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sairna.abdulrahman-hares.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// جلب الشركات
export async function getCompanies() {
  const response = await api.get('/website/companies');
  return response.data;
}

// جلب الرحلات (مرة واحدة فقط)
export async function getTrips(params = {}) {
  const response = await api.get('/website/trips', { params });
  return response.data;
}

// جلب مقاعد رحلة محددة
export async function getTripSeats(tripId) {
  const response = await api.get(`/website/trips/${tripId}/seats`);
  return response.data;
}

// إنشاء حجز جديد
export async function createBooking(bookingData) {
  const response = await api.post('/website/bookings', bookingData);
  return response.data;
}


export default api;