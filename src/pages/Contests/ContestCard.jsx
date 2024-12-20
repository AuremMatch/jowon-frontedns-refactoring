import React, { useState } from "react";
import { FaHeart, FaRegAngry, FaRegHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useToggleLike } from "../../hooks/useFetchLike";

export default function ContestCard({ video, liked }) {
  const { liked: dynamicLiked, toggleLike } = useToggleLike(video.id, liked); // 커스텀 훅 사용

  return (
    <Link
      to={`/contests/${video?.id}`}
      className="rounded-lg shadow-md cursor-pointer m-8 flex justify-center transform hover:scale-105 transition ease-in-out flex-col bg-white text-black"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="absolute top-2 right-2 text-red-500 cursor-pointer"
        onClick={toggleLike}
      >
        {dynamicLiked ? (
          <FaHeart className="text-4xl text-red-500" />
        ) : (
          <FaRegHeart className="text-4xl text-gray-500" />
        )}
      </div>
      <img
        src={video?.사진 || ""}
        alt="Your Image Description"
        className="w-full object-cover object-center p-4 h-[404px]"
      ></img>
      <div className="flex justify-center p-2 text-xl font-writeFont font-bold">
        {video?.제목 || "제목 없음"}
      </div>
      <div className="flex justify-center p-2 font-writeFont font-bold">
        분야: {video?.분야 || "분야 없음"}
      </div>
      {/* <div className="flex justify-center p-2 font-serif">
        마감기한: {video.created_at}
      </div> */}
      <div className="flex justify-center p-2 font-writeFont font-bold">
        접수기간 : {video?.접수기간 || "무기한"}
      </div>
    </Link>
  );
}
