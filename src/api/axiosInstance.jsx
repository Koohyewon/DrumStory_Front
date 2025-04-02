import axios from "axios";
import { API_BASE_URL } from "./api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("Role");

    if (token) {
      config.headers.Authorization = token; // 이미 Bearer 붙어 있음
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("토큰 만료! 로그아웃 처리 등 실행");
      localStorage.removeItem("Token");
      localStorage.removeItem("Role");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// ✅ 이 줄이 중요!
export default axiosInstance;
