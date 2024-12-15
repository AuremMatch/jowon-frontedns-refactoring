import React, { useState } from "react";
import { useFetchToday } from "../../hooks/useFetchToday";
import ContestCard from "./ContestCard";
import { useFilterReducer } from "../../reducer/useFilterReducer";
import Filtering from "../Filtering/Filtering";

export default function DataSection() {
  const [page, setPage] = useState(1); // 페이지네이션
  const { isLoading, error, data: videos } = useFetchToday(page); // 커스텀 훅 사용
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가
  const { state, handleFilterClick } = useFilterReducer();

  const displayVideos = () => {
    if (state.departmentChecked) return state.filteredVideos;
    if (state.latestChecked) return state.latestVideos;
    if (state.periodChecked) return state.periodVideos;
    if (searchResults.length > 0) return searchResults; // 검색 결과 우선
    if (searchResults.length === 0) return [];
    console.log(searchResults);

    return videos?.results || [];
  };

  return (
    <div>
      <Filtering
        activeFilter={state.activeFilter}
        onFilterClick={handleFilterClick}
        onSearchResults={setSearchResults}
      />
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
