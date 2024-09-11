// TeamActions.js
import React from "react";
import { FaBomb, FaFile, FaImage, FaStar } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function TeamActions({
  dispatch,
  handleFileChange,
  openTeamEvaluationModal,
}) {
  return (
    <div className="flex justify-center flex-col bg-gray-800 rounded-lg gap-4">
      <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg">
        <FaImage className="mr-4" size={24} /> <>사진/동영상</>
      </button>
      <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg">
        <FaFile className="mr-4" size={24} /> <>파일</>
      </button>
      <button
        className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg"
        onClick={() => dispatch({ type: "TOGGLE_MODAL_OPENS" })}
      >
        <FaBomb className="mr-4" size={24} /> <>팀파기</>
      </button>
      <button
        className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <FaStar className="mr-4" size={24} /> <>성과올리기</>
      </button>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        onClick={openTeamEvaluationModal}
        className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-red-500 text-white items-center hover:bg-red-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg"
      >
        <FiX className="mr-4" size={24} /> <>활동종료</>
      </button>
    </div>
  );
}
