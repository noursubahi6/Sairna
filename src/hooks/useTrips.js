import { useQuery } from '@tanstack/react-query';
import { getCompanies, getTrips, getTripSeats } from '../services/api';

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    staleTime: 1000 * 60 * 10,
  });
};

export const useTrips = () => {
  return useQuery({
    queryKey: ['trips'],
    queryFn: getTrips,
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

export const useTripSeats = (id) => {
  return useQuery({
    queryKey: ['tripSeats', id],
    queryFn: () => getTripSeats(id),
    enabled: !!id,
  });
};