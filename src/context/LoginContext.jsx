import React, { createContext, useState } from "react";

// Context 생성
export const LoginContext = createContext();

// Context Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 여부
  const [user, setUser] = useState(null); // 사용자 정보

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
