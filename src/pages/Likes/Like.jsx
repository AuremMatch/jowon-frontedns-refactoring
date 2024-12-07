import React from "react";
import { useFetchLike } from "../../hooks/useFetchLike";
import ContestCard from "../Contests/ContestCard";

export default function Like() {
  const { isLoading, error, data: likes } = useFetchLike(); // 커스텀 훅 사용
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {likes && (
        <div className="grid grid-cols-3 gap-3 mt-40">
          {likes.map((video) => (
            <div key={video.id} className="px-2">
              <ContestCard
                key={video.id}
                video={video}
                liked={true}
              ></ContestCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
