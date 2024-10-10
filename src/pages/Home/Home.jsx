import React, { useEffect, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import About from "./About";
import Scrolls from "../../components/scroll/Scrolls";
import Today from "./Today";
import { useNavigate } from "react-router-dom";

export default function Home({ scrollToSection }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // URL에서 토큰 추출
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    console.log(token);

    if (token) {
      // 토큰을 로컬 스토리지에 저장
      console.log("Received token:", token); // 콘솔로 토큰 확인
      localStorage.setItem("accessToken", token); // 로컬 스토리지에 저장
      setIsAuthenticated(true); // 인증 상태 업데이트
      navigate("/"); // 즉시 홈으로 이동
    } else {
      // 토큰이 없으면 에러 처리 또는 로그인 페이지로 리디렉션
      console.log("토큰에러");

      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <div className="w-full h-screen overflow-hidden ">
        <img
          src="/imgs/team.jpg"
          alt="Team Photo"
          className="w-full h-full object-cover"
        />
        <Scrolls />
      </div>
      <About className="bg-black" />
      <Today />
    </>
  );
}
