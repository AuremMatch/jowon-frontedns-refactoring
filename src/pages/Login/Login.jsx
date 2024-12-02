import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import { FaUserNinja, FaLock } from "react-icons/fa";
import SignUpModal from "./SignUpModal";
import Cookies from "js-cookie";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [isSignUpIn, setIsSignUpIn] = useState(false); // Sign Up 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return null;
    }
  });

  // 회원가입 모달 열기/닫기 처리
  const handleSignUpClick = () => setIsSignUpIn(true);
  const handleSignUpModalClose = () => setIsSignUpIn(false);

  // 사용자 정보 로컬 스토리지에 저장
  const saveUserInfoToLocalStorage = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("authToken", token);
  };

  // 로그인 처리
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userToken = Cookies.get("csrftoken") || "";

    const axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "X-CSRFToken": userToken,
      },
    });

    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/users/log-in",
        {
          username,
          password,
        }
      );
      console.log("로그인 성공:", response.data);
      setUser(response.data); // 로그인 성공 시 사용자 정보 설정
      saveUserInfoToLocalStorage(response.data); // 사용자 정보를 로컬 스토리지에 저장
      saveTokenToLocalStorage(response.data.token);
      navigate("/"); // 홈화면으로 이동
    } catch (error) {
      console.error("로그인 요청 중 에러:", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl">
        {/* 왼쪽 이미지 섹션 */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/imgs/c.jpg" // 대체 이미지
            alt="Programming code"
            className="object-cover w-full h-full"
          />
        </div>

        {/* 로그인 섹션 */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Login Aurem
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-slate-500 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition hover:scale-105"
            >
              로그인
            </button>
          </form>
          <div className="text-center mt-4">
            <button
              onClick={handleSignUpClick}
              className="text-slate-500 hover:underline"
            >
              회원가입
            </button>
            <p className="mt-2 text-gray-500">
              <a href="#" className="hover:underline">
                비밀번호 찾기
              </a>
            </p>
          </div>
        </div>
      </div>
      <SignUpModal
        handleSubmit={handleSubmit}
        isOpen={isSignUpIn}
        onClose={handleSignUpModalClose}
      />
    </div>
  );
}
