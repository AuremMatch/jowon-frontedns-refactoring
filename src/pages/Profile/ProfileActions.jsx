import React from "react";

export const ProfileActions = ({ navigateToNotiME, handleLinkClick }) => {
  return (
    <span className="flex justify-center">
      <button
        onClick={navigateToNotiME}
        className="w-30 h-12 mr-8 bg-gray-500 font-diphylleia font-bold text-2xl text-white py-2 px-4 rounded-sm hover:brightness-110 mt-12 hover:bg-black"
      >
        받은제의
      </button>

      <button
        onClick={handleLinkClick}
        className="w-30 h-12 mr-8 bg-gray-500 font-diphylleia font-bold text-2xl text-white py-2 px-4 rounded-sm hover:brightness-110 mt-12 hover:bg-black"
      >
        프로필추가
      </button>
      <button
        onClick={handleLinkClick}
        className="w-30 h-12 mr-8 bg-gray-500 font-diphylleia font-bold text-2xl text-white py-2 px-4 rounded-sm hover:brightness-110 mt-12 hover:bg-black"
      >
        포토폴리오
      </button>
    </span>
  );
};
