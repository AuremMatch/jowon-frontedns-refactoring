import React from "react";
import { FaImage, FaFile, FaBomb, FaStar } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const Sidebar = ({ handleDelete, handleUpload, handleCloseActivity }) => {
  return (
    <div className="border w-1/4 p-10 ml-12 flex justify-center flex-col">
      <button
        className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer"
        onClick={handleUpload}
      >
        <FaImage className="mr-4" size={24} />
        <>사진/동영상</>
      </button>
      <div className="flex justify-between mt-10 items-center"></div>

      <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer">
        <FaFile className="mr-4" size={24} />
        <>파일</>
      </button>

      <div className="flex justify-between mt-10 items-center"></div>

      <button
        className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer"
        onClick={handleDelete}
      >
        <FaBomb className="mr-4" size={24} />
        <>팀파기</>
      </button>

      <div className="flex justify-between mt-10 items-center"></div>

      <button
        className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer"
        onClick={handleUpload}
      >
        <FaStar className="mr-4" size={24} />
        <>성과올리기</>
      </button>

      <div className="flex justify-between mt-10 items-center"></div>

      <button
        onClick={handleCloseActivity}
        className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-red-400 text-black items-center hover:bg-black hover:text-white cursor-pointer"
      >
        <FiX className="mr-4" size={24} />
        <>활동종료</>
      </button>
    </div>
  );
};

export default Sidebar;
