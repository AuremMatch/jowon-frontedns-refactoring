import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contests from "./pages/Contests/Contests";
import Like from "./pages/Likes/Like";
import ContestDetail from "./pages/ContestDetail/ContestDetail";

import Apply from "./pages/Apply/Apply";
import TeamList from "./pages/TeamMatching/TeamList";
import TeamDetail from "./pages/TeamMatching/TeamDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 이 부분은 메인 레이아웃 컴포넌트로 사용됨
    children: [
      { index: true, element: <Home /> }, // 홈 페이지는 기본 경로로 렌더링됨
      { path: "contests", element: <Contests /> }, // /contests 경로는 Contests 컴포넌트를 렌더링
      { path: "likes", element: <Like /> }, // /contests 경로는 Contests 컴포넌트를 렌더링
      { path: "contests/:id", element: <ContestDetail /> },
      { path: "contests/:id/apply", element: <Apply /> },
      { path: "teammatching", element: <TeamList /> },
      { path: "teammatching/:id", element: <TeamDetail /> },
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
