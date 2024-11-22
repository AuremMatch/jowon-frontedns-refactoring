import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@chakra-ui/react";

import NotiAvatar from "./NotiAvatar";
import { useLocation } from "react-router-dom";
import useFetchVideo from "../../hooks/useFetchVideo"; // Import custom hook
import axiosInstance from "../../utils/axiosInstance"; // axiosInstance를 utils 폴더에서 import

export default function NotiCard({ video, onClick, isLoading }) {
  const location = useLocation();
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 수락 상태 불러오기
    const acceptedState = localStorage.getItem(`isAccepted-${video.id}`);
    if (acceptedState) {
      setIsAccepted(JSON.parse(acceptedState));
    }
  }, [video.id]);

  const handleAccept = async () => {
    try {
      // 수락 상태 업데이트
      setIsAccepted(true);
      localStorage.setItem(`isAccepted-${video.id}`, true);

      // 서버로 수락 요청 보내기
      const response = await axiosInstance.post(
        `http://127.0.0.1:8000/conversations/1/accept_pending_participant/`,
        { user_id: 3 } // 필요한 user_id를 전송
      );

      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error accepting participant:", error);
    }
  };

  return (
    <div
      onClick={onClick}
      className=" profile  rounded-lg shadow-md cursor-pointer m-8 flex justify-center transform hover:scale-105 transition ease-in-out flex-col bg-white text-black"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
          <p>생성 중입니다...</p>
        </div>
      )}
      <div className={isLoading ? "filter blur-sm" : ""}>
        <div className="avatar text-black p-4">
          <img
            src={
              video.image ||
              "https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/%EC%82%AC%EB%9E%8C2.jpg?alt=media&token=d4eab5aa-80b4-4214-b861-b05f2fcd009f"
            }
            alt="avatar"
            className="w-full h-80 object-cover rounded-md"
          />
        </div>
        <h1 className="font-writeFont text-2xl font-bold mt-4 text-black flex justify-center">
          {video.message.length > 10
            ? `${video.message.slice(0, 10)}... `
            : video.message}
        </h1>
        {/* 수락 상태가 false이고 메시지 길이가 10 이상일 때만 버튼 섹션을 렌더링 */}
        {!isAccepted && (
          <div className="flex  items-center justify-center m-4">
            {/* 수락 버튼 */}
            <button
              onClick={handleAccept}
              className="mr-2 relative font-writeFont px-8 py-4 text-black rounded-full overflow-hidden group"
            >
              <span className="absolute inset-0 bg-blue-300 group-hover:bg-blue-500 opacity-60 rounded-full transform scale-110 group-hover:scale-125 transition-transform duration-300 ease-in-out"></span>
              <span className="relative z-10 font-bold">수락</span>
            </button>

            {/* 거절 버튼 */}
            <button className="relative font-writeFont px-8 py-4 text-black rounded-full overflow-hidden group">
              <span className="absolute inset-0 bg-red-400 group-hover:bg-red-600  opacity-60 rounded-full transform scale-110 group-hover:scale-125 transition-transform duration-300 ease-in-out"></span>
              <span className="relative z-10 font-bold">거절</span>
            </button>
          </div>
        )}
        <div className="text-xl font-writeFont flex justify-center mt-4 text-blue-500 mb-4">
          내용 더보기
        </div>
      </div>
    </div>
  );
}
