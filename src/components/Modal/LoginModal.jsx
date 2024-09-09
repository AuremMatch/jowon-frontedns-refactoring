import React, { useState, useContext } from "react";

import { LoginContext } from "../../context/LoginContext";

const LoginModal = ({ isOpen, closeModal }) => {
  const { login } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 임시로 로그인 성공 처리
    const userData = { username }; // 서버 요청해서 가져올 사용자 정보라고 가정
    login(userData);
    closeModal(); // 로그인 성공 후 모달 닫기
  };

  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-xl mb-4">로그인</h2>
        <input
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          로그인
        </button>
        <button
          onClick={closeModal}
          className="w-full mt-2 bg-gray-300 text-black py-2 rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
