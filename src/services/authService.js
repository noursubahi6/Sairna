const API_URL = "https://sairna.abdulrahman-hares.com/api/v1/website/auth";

export async function loginApi(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "*/*",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  console.log("استجابة تسجيل الدخول من الباك:", data); // لمعاينة شكل البيانات بالكونسول

  if (!response.ok) {
    throw new Error(data.message || "فشل تسجيل الدخول");
  }

  return data;
}

export async function registerApi(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "*/*",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  console.log("استجابة إنشاء الحساب من الباك:", data); // لمعاينة شكل البيانات بالكونسول

  if (!response.ok) {
    throw new Error(data.message || "فشل إنشاء الحساب");
  }

  return data;
}

export async function getMyProfileApi() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("لا يوجد رمز مصادقة (Token في Local Storage)");
  }

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "accept": "*/*",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "فشل في جلب بيانات الملف الشخصي");
  }

  return resData.data || resData;
}