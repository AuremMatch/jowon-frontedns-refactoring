import React from "react";
import { useFetchToday } from "../../hooks/useFetchToday";
import ContestCard from "./ContestCard";
import { Link } from "react-router-dom";

export default function DataSection() {
  const { isLoading, error, data: videos } = useFetchToday(); // 커스텀 훅 사용
  return (
    <div>
      {" "}
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {videos && (
        <div className="grid grid-cols-3 gap-3">
          {videos.results.map((video) => (
            <div key={video.id} className="px-2">
              <ContestCard key={video.id} video={video}></ContestCard>
            </div>
          ))}

          <Link
            to="/pictures"
            className="flex items-center justify-center blinking-text"
          >
            <h1 className="text-3xl mb-2 font-diphylleia">more</h1>
          </Link>
        </div>
      )}
    </div>
  );
}
