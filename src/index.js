import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contests from "./pages/Contests/Contests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 이 부분은 메인 레이아웃 컴포넌트로 사용됨
    children: [
      { index: true, element: <Home /> }, // 홈 페이지는 기본 경로로 렌더링됨
      { path: "contests", element: <Contests /> }, // /contests 경로는 Contests 컴포넌트를 렌더링
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
