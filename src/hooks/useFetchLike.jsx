import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

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
