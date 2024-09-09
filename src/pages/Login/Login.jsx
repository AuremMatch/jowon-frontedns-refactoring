import React, { useContext } from "react";
import MenuItem from "../Header/MenuItem"; // 정확한 경로로 수정
import { LoginContext } from "../../context/LoginContext";

export default function Login({ scroll, color }) {
  const { isAuthenticated, user } = useContext(LoginContext); // 로그인 상태 및 사용자 정보 가져오기

  // 로그인 상태에 따라 name 값을 다르게 설정
  const menuItemName = isAuthenticated ? "Logout" : "Login";

  return <MenuItem name={menuItemName} scroll={scroll} color={color} />;
}
