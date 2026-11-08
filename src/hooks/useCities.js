import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "../services/cityService";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 1000 * 60 * 60,
  });
}