import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // axiosInstance를 가져옵니다.

export const useProfileData = () => {
  const [userData, setUserData] = useState(null);
  const [score, setScore] = useState({});
  const [coding, setCoding] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/users/me/"
        );
        setUserData(response.data);
        setScore(response.data.score);
        setCoding(response.data.coding);
      } catch (error) {
        setError("Network response was not ok");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, score, coding, loading, error };
};
