import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // 쿠키에 저장할 경우 사용
import { useEffect } from "react";

function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      axios
        .get(`http://127.0.0.1:8000/users/api/signup/verify-email/${token}/`)
        .then((response) => {
          console.log(response.data); // 서버에서 받은 응답 출력
          const accessToken = response.data.token;

          localStorage.setItem("accessToken", accessToken); // 로컬 스토리지에 저장

          // 2. 로그인 후 리디렉션
          setTimeout(() => {
            navigate("/dashboard"); // 로그인 후 사용자를 대시보드로 리디렉션
          }, 2000);
        })
        .catch((error) => {
          console.error("Token verification failed:", error.response.data);
          // 에러 처리
        });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
}

export default VerifyEmail;
