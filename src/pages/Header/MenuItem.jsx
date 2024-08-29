import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MenuItem({ name, scroll, color, className = "" }) {
  const location = useLocation();
  const path = `/${name.toLowerCase()}`;

  // Determine if the current path is "/likes"
  const isLikesPath = location.pathname === "/likes";

  // Determine the final text color
  const textColor = isLikesPath
    ? "text-black"
    : color
    ? color
    : scroll
    ? "text-black"
    : "text-white";

  return (
    <Link
      to={path}
      className={`p-3 cursor-pointer font-customFont text-3xl transition duration-200 ease-in-out transform hover:text-black hover:scale-110 ${textColor} ${className} p-3`}
    >
      <p className="stroke-black stroke-3 font-bold">{name}</p>
    </Link>
  );
}
