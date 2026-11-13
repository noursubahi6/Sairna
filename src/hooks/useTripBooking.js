import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBooking, fetchMyBookings, fetchTripDetails, fetchTripSeats } from '../services/bookingApi';

export const useTripBookingData = (tripId) => {
  // 1. جلب بيانات الرحلة (السعر، الشركة، المدن)
  const tripQuery = useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => fetchTripDetails(tripId),
    enabled: !!tripId,
  });

  // 2. جلب المقاعد المحجوزة والمتاحة
  const seatsQuery = useQuery({
    queryKey: ['tripSeats', tripId],
    queryFn: () => fetchTripSeats(tripId),
    enabled: !!tripId,
  });

  return {
    trip: tripQuery.data,
    seatsData: seatsQuery.data,
    isLoading: tripQuery.isLoading || seatsQuery.isLoading,
    isError: tripQuery.isError || seatsQuery.isError,
  };
};
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: (_, variables) => {
      // تحديث المقاعد تلقائياً ليظهر المقعد المحجوز باللون الرمادي فوراً
      queryClient.invalidateQueries({ queryKey: ["tripSeats", String(variables.tripId)] });
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });
};
export const useMyBookings = () => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: fetchMyBookings,
    enabled: !!token,
  });
};