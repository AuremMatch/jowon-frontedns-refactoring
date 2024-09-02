import React from "react";

export default function ContestButtons() {
  return (
    <div className="flex justify-between mt-12 gap-2 text-2xl">
      <Button label="지원하기" />
      <Button label="추가모집" />
      <Button label="지원현황" />
    </div>
  );
}

function Button({ label }) {
  return (
    <button className="bg-slate-500 hover:bg-black transition duration-300 hover:scale-110 text-white font-bold py-6 px-12 rounded whitespace-nowrap">
      {label}
    </button>
  );
}
