import axios from "axios";

// 로컬 스토리지에서 JWT 토큰 가져오기
const axiosInstance = () => {
  const token = localStorage.getItem("accessToken"); // JWT 토큰을 로컬 스토리지에서 가져옴

  return axios.create({
    baseURL: "http://127.0.0.1:8000", // 기본 백엔드 URL
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // JWT 토큰을 Authorization 헤더에 추가
    },
  });
};

export default axiosInstance();
