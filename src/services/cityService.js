import axios from "axios";

const API_BASE_URL = "https://sairna.abdulrahman-hares.com/api/v1";

export const fetchCities = async () => {
  const response = await axios.get(`${API_BASE_URL}/website/cities`);
  return response.data;
};