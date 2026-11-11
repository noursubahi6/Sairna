import axios from 'axios';

// إنشاء مثيل (Instance) لـ Axios مع رابط الباك إند الأساسي
const api = axios.create({
  baseURL: 'https://sairna.abdulrahman-hares.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// جلب الرحلات بناءً على الفلاتر
export async function getTrips({ originId, destinationId, date, companyId }) {
  const params = {
    originId,
    destinationId,
    date,
  };

  if (companyId && companyId !== 'all') {
    params.companyId = companyId;
  }

  const response = await api.get('/website/trips', { params });
  return response.data;
}

// إنشاء حجز جديد (مثال على استخدام Mutation)
export async function createBooking(bookingData) {
  const response = await api.post('/website/bookings', bookingData);
  return response.data;
}