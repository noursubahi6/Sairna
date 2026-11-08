import { useQuery } from "@tanstack/react-query";
import { getMyProfileApi } from "../services/authService";

export function useProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getMyProfileApi,
  });
}