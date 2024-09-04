import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import TeamCard from "./TeamCard";

const TeamList = () => {
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
        setIsLoading(false);
      } catch (error) {
        setError("Network response was not ok");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  let processedUserData = userData || [];

  // Participants가 있는 팀만 필터링
  processedUserData = processedUserData.filter(
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

  return (
    <section id="home" className="overflow-y-auto">
      <div className="relative w-full" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/imgs/teamList.jpg"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-black text-5xl font-serif">
            Team's talking
          </h1>
        </div>
      </div>

      <div className="grid-container justify-center">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {processedUserData &&
          processedUserData.map((video) => (
            <TeamCard
              key={video.id}
              data={video}
              teamName={video.teamName}
              image={video.image}
              rank={video.rank} // rank 전달
            />
          ))}
      </div>

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 3열 그리드 */
          gap: 8px; /* 그리드 아이템 간의 간격 */
          justify-items: center; /* 그리드 아이템을 중앙에 정렬 */
        }
      `}</style>
    </section>
  );
};

export default TeamList;
