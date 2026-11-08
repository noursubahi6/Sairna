const BASE_URL = "https://sairna.abdulrahman-hares.com/api/v1/website/companies";

export const getCompanies = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("فشل في جلب قائمة الشركات");
  }

  return response.json();
};