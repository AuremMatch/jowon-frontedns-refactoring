import React from "react";
import { Radar } from "react-chartjs-2";

export const ProfileChart = ({
  currentChart,
  setCurrentChart,
  data,
  codingData,
  options,
}) => {
  return (
    <>
      <div className="w-full basis-5/12 flex flex-col text-left justify-center mt-12">
        {currentChart === "distribution" && (
          <div>
            <span className="text-2xl font-dongle_light w-1/3">분포도</span>
            <Radar data={data} options={options} />
          </div>
        )}

        {currentChart === "coding" && (
          <div>
            <span className="text-2xl font-dongle_light w-1/3 flex justify-center">
              코딩 능력
            </span>
            <Radar data={codingData} options={options} />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setCurrentChart("distribution")}
          className={`px-4 py-2 rounded-l ${
            currentChart === "distribution"
              ? "bg-black text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          분포도
        </button>
        <button
          onClick={() => setCurrentChart("coding")}
          className={`px-4 py-2 rounded-r ${
            currentChart === "coding"
              ? "bg-black text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          코딩 능력
        </button>
      </div>
    </>
  );
};
