import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const useFetchApplicants = (contestId) => {
  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axiosInstance.get(
          `http://127.0.0.1:8000/contests/${contestId}/applicants/`
        );
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Network response was not ok");
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [contestId, axiosInstance]);

  return { userData, isLoading, error };
};
