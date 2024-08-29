import React from "react";

function Filtering({ activeFilter, onFilterClick }) {
  return (
    <div className="flex justify-end p-8">
      <button
        className={`${
          activeFilter === "department" ? "bg-gray-800" : "bg-gray-500"
        } text-white font-bold py-4 px-6 rounded mr-2`}
        onClick={() => onFilterClick("department")}
      >
        학과별
      </button>
      <button
        className={`${
          activeFilter === "latest" ? "bg-gray-800" : "bg-gray-500"
        } text-white font-bold py-2 px-4 rounded mr-2`}
        onClick={() => onFilterClick("latest")}
      >
        최신별
      </button>
      <button
        className={`${
          activeFilter === "period" ? "bg-gray-800" : "bg-gray-500"
        } text-white font-bold py-2 px-4 rounded mr-2`}
        onClick={() => onFilterClick("period")}
      >
        기간별
      </button>
    </div>
  );
}

export default Filtering;
