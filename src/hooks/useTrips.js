import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTrips, createBooking } from '../services/tripService';

// هوك لجلب الرحلات (Query)
export function useTrips(filters) {
  return useQuery({
    queryKey: ['trips', filters],
    queryFn: () => getTrips(filters),
    keepPreviousData: true,
  });
}

// هوك لإنشاء حجز (Mutation)
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      alert("تم الحجز بنجاح!");
    },
    onError: (error) => {
      alert(`حدث خطأ أثناء الحجز: ${error.response?.data?.message || error.message}`);
    },
  });
}