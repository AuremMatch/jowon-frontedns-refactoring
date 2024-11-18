import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // axiosInstance를 utils 폴더에서 import

const useFetchVideo = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [video, setVideo] = useState(null);
  const [pendingParticipants, setPendingParticipants] = useState([]);
  const [codingScores, setCodingScores] = useState([]);

  useEffect(() => {
    // Fetch pending participants
    const fetchPendingParticipants = async () => {
      try {
        const response = await axiosInstance.get(
          `http://127.0.0.1:8000/conversations/${id}`
        );
        setPendingParticipants(response.data.pendingParticipants);
      } catch (error) {
        console.error("대기 중인 팀원을 불러오는 중 오류 발생:", error);
      }
    };

    fetchPendingParticipants();
  }, [id]);

  useEffect(() => {
    // Fetch video data
    const fetchVideo = async () => {
      try {
        const response = await axiosInstance.get(
          `http://127.0.0.1:8000/conversations/${id}`
        );
        setVideo(response.data);

        if (
          response.data.matching_type === "random" ||
          response.data.matching_type === "same"
        ) {
          const participants = response.data.participants;
          const codingScores = participants.map(
            (participant) => participant.coding
          );
          setCodingScores(codingScores);
          console.log("Coding Scores:", codingScores);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  return { video, setVideo, pendingParticipants, codingScores, id };
};

export default useFetchVideo;
