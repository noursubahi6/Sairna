const BASE_URL = "https://sairna.abdulrahman-hares.com/api/v1/website/trips";

export const getTrips = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${BASE_URL}?${queryParams}`);

  if (!response.ok) {
    throw new Error("فشل في جلب الرحلات المتاحة");
  }

  return response.json();
};
