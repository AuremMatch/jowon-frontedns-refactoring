import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

import { useLocation } from "react-router-dom";
import NotiCard from "./NotiCard";
import useNotificationData from "../../hooks/useNotificationData";

export default function Notification() {
  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const location = useLocation();
  const { isLoading, error, data: userData } = useNotificationData(); // 커스텀 훅 사용

  const navigate = useNavigate();

  const handleClick = (conversation) => {
    navigate(`/teammatching/${conversation}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-black p-12">
        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p>Something is wrong...</p>}
          {userData && (
            <div className="grid grid-cols-3 gap-8 mt-24">
              {userData.map((video) => (
                <div key={video.id}>
                  <NotiCard
                    onClick={() => handleClick(video.conversation)}
                    video={video}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        )
      </div>
    </div>
  );
}
