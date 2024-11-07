import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current URL:", window.location.href);

    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      console.log("Stored token found, navigating to home");
      navigate("/"); // 이미 토큰이 있으면 홈으로 이동
      return;
    }

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      console.log("Received token:", token); // 콘솔로 토큰 확인
      localStorage.setItem("accessToken", token); // 로컬 스토리지에 저장
      navigate("/"); // 홈으로 이동
    } else {
      console.log("토큰에러");
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [navigate]);

  return null;
}
