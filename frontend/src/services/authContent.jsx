// 創建一個 Context
import React, { createContext, useDebugValue, useState } from "react";

export const AuthContext = createContext();

// 在最上層的組件中提供狀態
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
