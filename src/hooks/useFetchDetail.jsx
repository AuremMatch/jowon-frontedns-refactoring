import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchDetail = (id) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/contests/${id}`
        );
        setVideo(response.data);
        console.log(response.data.사진);
      } catch (error) {
        console.error("Error fetching video:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  return { video, loading, error };
};
