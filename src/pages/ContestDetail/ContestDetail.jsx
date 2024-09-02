import React from "react";
import { useParams } from "react-router-dom";
import { useFetchDetail } from "../../hooks/useFetchDetail";
import ContestInfo from "./ContestInfo";

import ContestButtons from "./ContestButton";

export default function ContestDetail() {
  const { id } = useParams();
  console.log(id);

  const { video, loading, error } = useFetchDetail(id);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading video: {error.message}
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <section className="w-5/6 h-5/6 flex flex-col md:flex-row p-6 md:p-12 items-center justify-between bg-gray-800 rounded-lg shadow-lg">
        <div className="w-full mb-8">
          <h1 className="text-3xl font-bold mb-6">{video.제목}</h1>
          <img
            src={video.사진}
            className="w-full rounded-lg shadow-md"
            alt={video.제목}
          />
        </div>

        <div className="w-full md:w-1/2 ml-24">
          <ContestInfo video={video} />
          <ContestButtons />
        </div>
      </section>
    </div>
  );
}
