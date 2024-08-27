import React from "react";
import Login from "../Login/Login";

export default function PageMenu() {
  return (
    <ul className="absolute top-full left-0 right-2">
      <li className="p-2">Profile</li>
      <li className="p-2">PointShop</li>
      <li className="p-2">Ranking</li>
      <li className="p-2">Notification</li>
      <Login></Login>
    </ul>
  );
}
