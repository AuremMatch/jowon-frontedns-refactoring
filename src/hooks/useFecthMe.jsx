import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const useFetchMe = (id) => {
  const [Me, setMe] = useState(null);
  const [loading, setLoading] = useState(true); // loading 상태 추가
  const [error, setError] = useState(null); // error 상태 추가

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true); // 요청 시작 전 loading 상태를 true로 설정
        const response = await axiosInstance.get(
          `http://127.0.0.1:8000/users/me/`
        );
        setMe(response.data);
      } catch (error) {
        console.error("Error fetching Me:", error);
        setError(error);
      } finally {
        setLoading(false); // 요청이 끝난 후 loading 상태를 false로 설정
      }
    };

    fetchMe();
  }, [id]);

  return { Me, loading, error };
};
