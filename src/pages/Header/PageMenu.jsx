import React from "react";
import Login from "../Login/Login";
import MenuItem from "./MenuItem";

const menuItems = [
  { name: "Profile" },
  { name: "PointShop" },
  { name: "Ranking" },
  { name: "Notification" },
];

export default function PageMenu() {
  return (
    <ul className="absolute top-full left-0 right-2">
      {menuItems.map((item, index) => (
        <MenuItem key={index} name={item.name} />
      ))}
      <li className="p-2">
        <Login />
      </li>
    </ul>
  );
}
