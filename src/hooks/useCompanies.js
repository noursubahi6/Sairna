import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../services/companyService";

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"], // المفتاح الفريد للكاش
    queryFn: getCompanies,    // دالة جلب البيانات
    staleTime: 1000 * 60 * 5, // الاحتفاظ بالبيانات كـ fresh لمدة 5 دقائق
  });
};