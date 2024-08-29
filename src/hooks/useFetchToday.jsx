import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchToday = (page) => {
  console.log(page);

  return useQuery({
    queryKey: ["videos", page],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/contests/?page=${page}`
        );
        return response.data;
      } catch (error) {
        throw new Error("Network response was not ok");
      }
    },
  });
};
