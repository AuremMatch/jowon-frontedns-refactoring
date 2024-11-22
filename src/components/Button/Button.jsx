import React from "react";

export default function Button({ onClick, label }) {
  return (
    <button
      className="bg-slate-500 hover:bg-black transition duration-300 hover:scale-110 text-white font-bold font-writeFont py-6 px-12 rounded whitespace-nowrap"
      onClick={onClick} // onClick prop을 button 요소에 전달
    >
      {label}
    </button>
  );
}
