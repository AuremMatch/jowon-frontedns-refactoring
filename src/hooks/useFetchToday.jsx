import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchToday = (page, shouldFetch) => {
  return useQuery({
    queryKey: ["videos", page],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/contests/?page=${page}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: shouldFetch, // shouldFetch가 true일 때만 쿼리를 실행
  });
};

export const useFetch = (page) => {
  console.log(page);

  return useQuery({
    queryKey: ["today", page],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/contests/`);
        return response.data;
      } catch (error) {
        throw new Error("Network response was not ok");
      }
    },
  });
};
