import React from "react";

export default function MenuItem({ name, scroll }) {
  return (
    <li
      className={`p-3 cursor-pointer font-customFont text-3xl transition duration-200 ease-in-out transform hover:text-black hover:scale-110 ${
        scroll ? "text-black" : "text-white"
      }`}
    >
      <span className="stroke-black stroke-3 font-bold"> {name}</span>
    </li>
  );
}
