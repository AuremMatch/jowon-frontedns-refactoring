import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useNotificationData = () => {
  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  return useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/notifications/"
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error("Network response was not ok");
      }
    },
  });
};

export default useNotificationData;
