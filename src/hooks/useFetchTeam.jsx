import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const useFetchTeam = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/conversations/"
        );
        setUserData(response.data);
      } catch (error) {
        setError("Network response was not ok");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Participants가 있는 팀만 필터링
  let processedUserData = userData.filter(
    (team) => team.participants && team.participants.length > 0
  );

  if (processedUserData.length > 0) {
    // "c언어와 실습(실습조)" 팀만 별도로 추출하여 순위를 매김
    const cLanguageTeams = processedUserData.filter(
      (team) => team.teamName === "c언어와 실습(실습조)"
    );
    cLanguageTeams.sort((a, b) => b.score - a.score); // 점수(score)를 기준으로 내림차순 정렬

    // 순위 부여
    cLanguageTeams.forEach((team, index) => {
      team.rank = index + 1; // 1위부터 시작
    });

    // 나머지 팀들과 병합
    const otherTeams = processedUserData.filter(
      (team) => team.teamName !== "c언어와 실습(실습조)"
    );
    processedUserData = [...cLanguageTeams, ...otherTeams];
  }

  return { processedUserData, isLoading, error };
};

export default useFetchTeam;
