import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, registerApi, getMyProfileApi } from "../services/authService";

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getMyProfileApi,
  });
}