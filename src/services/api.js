import axios from 'axios';

const api = axios.create({
  headers: {
    'Accept': 'application/json',
  },
});

// ==========================================
// 1. قسم شركات النقل
// ==========================================
export const getCompanies = async () => {
  const { data } = await api.get('https://sairna.abdulrahman-hares.com/api/v1/website/companies');
  return data;
};

// ==========================================
// 2. قسم الرحلات (بدون استقبال باراميترات خاطئة تسبب خطأ 400)
// ==========================================
export const getTrips = async () => {
  const { data } = await api.get('https://sairna.abdulrahman-hares.com/api/v1/website/trips');
  return data;
};

// رابط تفاصيل رحلة محددة
export const getTripById = async (id) => {
  const { data } = await api.get(`https://sairna.abdulrahman-hares.com/api/v1/website/trips/${id}`);
  return data;
};

// رابط عرض مقاعد رحلة
export const getTripSeats = async (id) => {
  const { data } = await api.get(`https://sairna.abdulrahman-hares.com/api/v1/website/trips/${id}/seats`);
  return data;
};