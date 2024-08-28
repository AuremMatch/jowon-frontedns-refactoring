import React from "react";

export default function MenuItem({ name }) {
  return (
    <li className="p-3 cursor-pointer font-customFont text-2xl transition duration-300 ease-in-out transform  hover:text-pink-800 hover:scale-110">
      {name}
    </li>
  );
}
