import React from "react";
import { Link } from "react-router-dom";

export default function ContestCard({ video }) {
  return (
    <Link
      to={`/pictures/${video?.id}`}
      className="rounded-lg shadow-md cursor-pointer m-8 flex justify-center transform hover:scale-105 transition ease-in-out flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="absolute top-2 right-2 text-red-500 cursor-pointer"
        // onClick={toggleLike}
      >
        {/* {liked ? (
          <FaHeart className="text-4xl text-red-500" />
        ) : (
          <FaRegHeart className="text-4xl" />
        )} */}
      </div>
      <img
        src={video?.사진 || ""}
        alt="Your Image Description"
        className="w-full object-cover object-center p-4 h-[404px]"
      ></img>
      <div className="flex justify-center p-2 text-xl font-bold">
        {video?.제목 || "제목 없음"}
      </div>
      <div className="flex justify-center p-2 font-serif">
        분야: {video?.분야 || "분야 없음"}
      </div>
      {/* <div className="flex justify-center p-2 font-serif">
        마감기한: {video.created_at}
      </div> */}
      <div className="flex justify-center p-2 font-serif">
        상금: {video?.상금 || "상금 없음"}
      </div>
    </Link>
  );
}
