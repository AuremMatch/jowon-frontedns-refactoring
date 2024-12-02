import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useProfileData } from "./useProfileData";

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
  const { userData, loading, error } = useProfileData();

  // 항상 호출되는 useState
  const [liked, setLiked] = useState(false); // 기본값 false로 초기화

  useEffect(() => {
    // userData가 준비된 후에만 로컬 스토리지를 확인
    if (userData) {
      const savedLiked = localStorage.getItem(
        `liked_${userData.id}_${videoId}`
      );
      setLiked(savedLiked ? JSON.parse(savedLiked) : false);
    }
  }, [userData, videoId]);

  const toggleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const newLiked = !liked;
      setLiked(newLiked); // 낙관적 UI 업데이트
      localStorage.setItem(
        `liked_${userData.id}_${videoId}`,
        JSON.stringify(newLiked)
      );

      await axiosInstance.put("http://127.0.0.1:8000/users/me/favs/", {
        id: videoId,
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      setLiked(!liked); // 에러 발생 시 롤백
      localStorage.setItem(
        `liked_${userData.id}_${videoId}`,
        JSON.stringify(!liked)
      );
    }
  };

  return { liked, toggleLike };
}
