import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MenuItem({ name, scroll, color, className = "" }) {
  const location = useLocation();
  const path = `/${name.toLowerCase()}`;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로컬 스토리지에서 토큰 정보를 확인하여 로그인 상태 설정
  useEffect(() => {
    if (name.toLowerCase() === "login") {
      const accessToken = localStorage.getItem("authToken");
      if (accessToken) {
        setIsAuthenticated(true); // 토큰이 있으면 로그인 상태로 설정
      }
    }
  }, [name]);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // 로컬 스토리지에서 토큰 삭제
    setIsAuthenticated(false); // 상태 업데이트
    window.location.reload(); // 페이지 새로고침
  };

  // 현재 경로가 "/likes" 또는 "/contests" 인지 확인
  const isLikesPath =
    location.pathname === "/likes" || location.pathname === "/contests";

  // 최종 텍스트 색상 결정
  const textColor = isLikesPath
    ? "text-black"
    : color
    ? color
    : scroll
    ? "text-black"
    : "text-white";

  // 로그인/로그아웃 버튼 처리
  if (name.toLowerCase() === "login") {
    return (
      <>
        {isAuthenticated ? (
          <p
            onClick={handleLogout}
            className={`p-3 cursor-pointer font-writeFont text-3xl transition duration-200 ease-in-out transform hover:text-black  ${textColor} ${className}`}
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            Logout
          </p>
        ) : (
          <Link
            to="/login"
            className={`p-3 cursor-pointer font-writeFont text-3xl transition duration-200 ease-in-out transform hover:text-black  ${textColor} ${className}`}
          >
            <p
              style={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              }}
              className="stroke-black stroke-3 font-bold"
            >
              {name}
            </p>
          </Link>
        )}
      </>
    );
  }

  // 나머지 메뉴 항목은 로그인 상태와 관계없이 그대로 렌더링
  return (
    <Link
      to={path}
      className={`p-3 cursor-pointer font-writeFont text-3xl transition duration-200 ease-in-out transform hover:text-black  ${textColor} ${className}`}
    >
      <p
        style={{
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
        }}
        className="stroke-black stroke-3 font-bold hover-underline" // 클래스 추가
      >
        {name}
      </p>
    </Link>
  );
}
