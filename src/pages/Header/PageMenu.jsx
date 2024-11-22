import React from "react";
import Login from "../Login/Login";
import MenuItem from "./MenuItem";

const menuItems = [
  { name: "Profile" },
  { name: "PointShop" },
  { name: "Ranking" },
  { name: "Noti" },
  { name: "Login" },
];

export default function PageMenu() {
  return (
    <ul className="text-black absolute top-full left-0 right-2 bg-white flex align-center  flex-col">
      {menuItems.map((item, index) => (
        <MenuItem key={index} name={item.name} scroll={true} />
      ))}
    </ul>
  );
}
