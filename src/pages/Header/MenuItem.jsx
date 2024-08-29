import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ name, scroll }) {
  const path = `/${name.toLowerCase()}`;
  return (
    <Link
      to={path}
      className={`p-3 cursor-pointer font-customFont text-3xl transition duration-200 ease-in-out transform hover:text-black hover:scale-110 ${
        scroll ? "text-black" : "text-white"
      }`}
    >
      <p className="stroke-black stroke-3 font-bold"> {name}</p>
    </Link>
  );
}
