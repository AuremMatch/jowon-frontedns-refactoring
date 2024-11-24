import React, { useEffect, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import About from "./About";
import Scrolls from "../../components/scroll/Scrolls";
import Today from "./Today";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isSun } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log("Token exists in Home, setting isAuthenticated to true");
      setIsAuthenticated(true); // 인증 상태 업데이트
    } else {
      console.log("No token found in Home");
      setIsAuthenticated(false); // 인증 상태가 없으면 로그인 페이지로 리디렉션
    }
  }, []);
  return (
    <>
      <div className="w-full h-screen overflow-hidden ">
        <img
          src={isSun ? "/imgs/sun.jpg" : "/imgs/a.jpg"}
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
