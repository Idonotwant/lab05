app.get("/protected", (req, res) => {
  // 從 Cookie 中獲取 JWT
  const token = req.cookies.token;

  // 驗證 JWT
  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      // 如果 JWT 驗證失敗，返回未授權的錯誤
      return res.status(401).send("Unauthorized");
    }

    // 如果 JWT 驗證成功，取出用戶信息並返回
    const user = decoded;
    res.status(200).json(user);
  });
});

import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const MyComponent = () => {
  const { isLogin } = useContext(AuthContext);

  return <div>{isLogin ? "已登入" : "未登入"}</div>;
};

export default MyComponent;
