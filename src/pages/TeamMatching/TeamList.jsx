import React from "react";

import TeamCard from "./TeamCard";
import useFetchTeam from "../../hooks/useFetchTeam";

const TeamList = () => {
  const { processedUserData, isLoading, error } = useFetchTeam();

  return (
    <section id="home" className="overflow-y-auto">
      <div className="relative w-full" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/imgs/b.jpg"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1
            className="absolute text-white text-7xl font-customFont font-bold"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            Content List
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
