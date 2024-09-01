import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

export const useFetchLike = (page) => {
  const shouldFetch = true; // 쿼리 실행 여부를 결정하는 조건

  return useQuery({
    queryKey: ["likes", page],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `http://127.0.0.1:8000/users/me/favs/`
      );
      return response.data;
    },
    staleTime: Infinity, // 데이터가 절대 만료되지 않음 (무제한 캐시)
    cacheTime: Infinity, // 데이터가 메모리에서 제거되지 않음
    refetchOnWindowFocus: false, // 창이 다시 포커스될 때 리패칭 방지
    enabled: shouldFetch, // shouldFetch가 true일 때만 쿼리 실행
  });
};

export function useToggleLike(videoId) {
  const [liked, setLiked] = useState(() => {
    // Retrieve the initial liked state from localStorage
    const savedLiked = localStorage.getItem(`liked_${videoId}`);
    // 로그를 주석처리하거나 제거
    // console.log(savedLiked);

    return savedLiked ? JSON.parse(savedLiked) : false;
  });

  const toggleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const newLiked = !liked;
      setLiked(newLiked); // Optimistic UI update
      localStorage.setItem(`liked_${videoId}`, JSON.stringify(newLiked));

      await axiosInstance.put("http://127.0.0.1:8000/users/me/favs/", {
        id: videoId,
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      setLiked(!liked); // Rollback on error
      localStorage.setItem(`liked_${videoId}`, JSON.stringify(!liked));
    }
  };

  return { liked, toggleLike };
}
