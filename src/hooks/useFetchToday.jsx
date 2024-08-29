import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchToday = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/contests/");
        return response.data;
      } catch (error) {
        throw new Error("Network response was not ok");
      }
    },
  });
};
