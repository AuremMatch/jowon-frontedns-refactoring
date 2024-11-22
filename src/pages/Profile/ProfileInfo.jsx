import React from "react";
import { StarRating } from "./StarRating";

export const ProfileInfo = ({ userData }) => {
  return (
    <div className="w-full basis-5/12 flex flex-col p-4 text-left mb-8">
      <div className="flex items-center py-1 mb-8 ">
        <span className="text-2xl font-writeFont w-1/3 mr-40">이름</span>
        <span className="text-2xl font-writeFont w-2/3 ">
          {userData.username}
        </span>
      </div>

      <div className="flex items-center mb-8">
        <span className="text-2xl font-writeFont w-1/3 mr-40">신뢰도</span>
        <span className="text-2xl font-writeFont w-2/3">
          <StarRating
            totalStars={userData.average_rating}
            yellowStars={userData.average_rating}
          />
        </span>
      </div>

      <div className="flex items-center mb-8">
        <span className="text-2xl font-writeFont w-1/3 mr-40">분야</span>
        <span className="text-2xl font-writeFont w-2/3">
          {userData.개발경력}
        </span>
      </div>

      <div className="flex items-center mb-8">
        <span className="text-2xl font-writeFont w-1/3 mr-40">총획득상금</span>
        <span className="text-2xl font-writeFont w-2/3">227만원</span>
      </div>

      <div className="flex items-center mb-12">
        <span className="text-2xl font-writeFont w-1/3 mr-28">수상 4</span>
        <div className="flex flex-col">
          <div className="text-2xl font-writeFont">2024 | 코딩공모전 금상</div>
          <div className="text-2xl font-writeFont">2023 | 알고리즘ap 금상</div>
          <div className="text-2xl font-writeFont">2022 | 전국ai대회 금상</div>
          <div className="text-2xl font-writeFont">2022 | 전국 crt 금상</div>
        </div>
      </div>

      <div className="flex items-center py-2 mb-12">
        <span className="text-2xl font-writeFont w-1/3 mr-24">MBTI</span>
        <p className="text-2xl font-writeFont">ISTP</p>
      </div>
    </div>
  );
};
