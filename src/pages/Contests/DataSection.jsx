import React, { useState } from "react";
import { useFetchToday } from "../../hooks/useFetchToday";
import ContestCard from "./ContestCard";
import { useFilterReducer } from "../../reducer/useFilterReducer";

export default function DataSection() {
  const [page, setPage] = useState(1); // 페이지네이션
  const { isLoading, error, data: videos } = useFetchToday(page); // 커스텀 훅 사용

  const { state, handleFilterClick } = useFilterReducer();

  const displayVideos = () => {
    if (state.departmentChecked) return state.filteredVideos;
    if (state.latestChecked) return state.latestVideos;
    if (state.periodChecked) return state.periodVideos;
    return videos?.results || [];
  };

  return (
    <div>
      <div className="flex justify-end p-8">
        <button
          className={`${
            state.activeFilter === "department" ? "bg-gray-800" : "bg-gray-500"
          } text-white font-bold py-4 px-6 rounded mr-2`}
          onClick={() => handleFilterClick("department")}
        >
          학과별
        </button>
        <button
          className={`${
            state.activeFilter === "latest" ? "bg-gray-800" : "bg-gray-500"
          } text-white font-bold py-2 px-4 rounded mr-2`}
          onClick={() => handleFilterClick("latest")}
        >
          최신별
        </button>
        <button
          className={`${
            state.activeFilter === "period" ? "bg-gray-800" : "bg-gray-500"
          } text-white font-bold py-2 px-4 rounded mr-2`}
          onClick={() => handleFilterClick("period")}
        >
          기간별
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {videos && (
        <div className="grid grid-cols-3 gap-3">
          {displayVideos().map((video) => (
            <div key={video.id} className="px-2">
              <ContestCard key={video.id} video={video}></ContestCard>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4 p-4 mb-12">
        <button
          className={`bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 hover:scale-110 ${
            !videos || !videos.previous ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={!videos || !videos.previous}
        >
          Previous
        </button>
        <button
          className={`bg-gray-800 text-white font-bold py-2 px-4 rounded ml-2 transition duration-300 hover:scale-110 ${
            !videos || !videos.next ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={!videos || !videos.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
