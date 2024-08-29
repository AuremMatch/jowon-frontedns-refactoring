import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

export const useFetchLike = (page) => {
  console.log(page);

  return useQuery({
    queryKey: ["likes", page],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `http://127.0.0.1:8000/users/me/favs/`
        );
        return response.data;
      } catch (error) {
        throw new Error("Network response was not ok");
      }
    },
  });
};

export function useToggleLike(videoId) {
  const [liked, setLiked] = useState(() => {
    // Retrieve the initial liked state from localStorage
    const savedLiked = localStorage.getItem(`liked_${videoId}`);
    console.log(savedLiked);

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
