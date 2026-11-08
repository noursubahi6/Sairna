import { useQuery } from "@tanstack/react-query";
import { getTrips } from "../services/tripService";

export const useTrips = (filters) => {
  return useQuery({
    queryKey: ["trips", filters],
    queryFn: () => getTrips(filters),
    keepPreviousData: true,
  });
};