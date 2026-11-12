import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getCompanies, getTrips, getTripSeats } from '../services/api';

// إنشاء عميل Axios مخصص لضمان إرفاق الـ Token تلقائياً مع كل طلب (مثل الحجز)
const api = axios.create({
  baseURL: 'https://sairna.abdulrahman-hares.com/api/v1',
});

// إضافة الـ Token تلقائياً من الـ localStorage إلى الـ Headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    staleTime: 1000 * 60 * 10,
  });
};

export const useTrips = (filters = {}) => {
  return useQuery({
    queryKey: ['trips', filters],
    queryFn: () => getTrips(filters),
    staleTime: 1000 * 60 * 5,
    select: (data) => {
      const tripsArray = Array.isArray(data) ? data : (data?.data || data?.trips || []);
      const uniqueTripsMap = new Map();
      tripsArray.forEach((trip) => {
        if (trip && trip.id) {
          uniqueTripsMap.set(trip.id, trip);
        }
      });
      return Array.from(uniqueTripsMap.values());
    },
  });
};

export const useTripSeats = (tripId) => {
  return useQuery({
    queryKey: ['tripSeats', tripId],
    queryFn: () => getTripSeats(tripId),
    enabled: !!tripId,
  });
};

// تحديث هوك إنشاء الحجز ليستخدم العميل الموثق وتجنب خطأ 401 Unauthorized
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData) => {
      // إرسال الطلب مع الـ Token المرفق تلقائياً
      const response = await api.post('/website/bookings', bookingData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tripSeats'] });
      // ملاحظة: يمكنك إزالة الـ alert هنا إذا كنت تفضل الانتقال مباشرة لصفحة النجاح دون رسالة منبثقة
    },
    onError: (error) => {
      alert(`فشل الحجز: ${error.response?.data?.message || error.message}`);
    },
  });
}