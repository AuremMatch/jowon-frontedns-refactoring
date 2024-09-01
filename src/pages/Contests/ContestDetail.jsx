import React from "react";
import { useParams } from "react-router-dom";
import { useFetchDetail } from "../../hooks/useFetchDetail";

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
        <div className="w-full  mb-8 ">
          <h1 className="text-3xl  font-bold mb-6">{video.제목}</h1>
          <img
            src={video.사진}
            className="w-full rounded-lg shadow-md"
            alt={video.제목}
          />
        </div>

        <div className="w-full md:w-1/2 ml-24">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-semibold w-1/3">
                연관학과
              </span>
              <span className="text-lg md:text-xl w-2/3">{video.연관학과}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-semibold w-1/3">
                시상금
              </span>
              <span className="text-lg md:text-xl w-2/3">{video.상금}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-semibold w-1/3">
                학년
              </span>
              <span className="text-lg md:text-xl w-2/3">{video.학년}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-semibold w-1/3">
                분야
              </span>
              <span className="text-lg md:text-xl w-2/3">{video.분야}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-semibold w-1/3">
                위치
              </span>
              <span className="text-lg md:text-xl w-2/3">{video.위치}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-semibold w-1/3">
                응모분야
              </span>
              <span className="text-lg md:text-xl w-2/3">{video.응모분야}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-semibold w-1/3">
                참가대상
              </span>
              <span className="text-lg md:text-xl w-2/3">{video.참가대상}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-semibold w-1/3">
                접수기간
              </span>
              <span className="text-lg md:text-xl w-2/3">{video.접수기간}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-semibold w-1/3">
                접수방법
              </span>
              <span className="text-lg md:text-xl w-2/3">{video.접수방법}</span>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            {/* 버튼이나 추가 요소들 여기에 위치 */}
          </div>
        </div>
      </section>
    </div>
  );
}
