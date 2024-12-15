import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

function Filtering({ activeFilter, onFilterClick, onSearchResults }) {
  const [keyword, setKeyword] = useState("");
  const [errorMessage, setErrrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // 나미가 보물 이름을 기억하는 상자

  const handleSearch = async () => {
    if (!keyword) {
      alert("검색어를 입력해주세요!");
      return;
    }

    setIsLoading(true);

    try {
      // axios로 GET 요청 보내기
      const response = await axios.get(
        `http://127.0.0.1:8000/contests/search/`,
        {
          params: { keyword: keyword }, // keyword를 쿼리 파라미터로 보냄
        }
      );

      console.log("Search keyword:", keyword);
      console.log("Search result:", response.data); // 결과 출력
      // 부모로 검색 결과 전달
      onSearchResults(response.data); // 검색 결과를 부모로 전달
      setErrrorMessage(""); // 성공적으로 검색시 에러 초기화
    } catch (error) {
      console.error("검색 요청 중 오류 발생:", error); // 에러 처리

      if (error.response) {
        setErrrorMessage(
          `오류 발생: ${error.response.status} - ${
            error.response.data.message || "알수 없는 오류"
          }`
        );
      } else if (error.request) {
        setErrrorMessage("서버 응답이 없습니다. 네트워크 상태를 확인해주세요");
      } else {
        setErrrorMessage("요청중 문제가 발생했습니다: ${error.message}");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-between p-8">
      <div>
        <div className="relative w-[400px] hover:w-[650px] transition-all">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="원하는 활동을 검색해보세요..."
            className="w-full h-[65px] pl-6 pr-16 rounded-full shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800 text-lg"
          />
          {errorMessage && <p className="text-red-50">{errorMessage}</p>}
          <button
            onClick={handleSearch}
            className="absolute top-1/2 right-6 transform -translate-y-1/2 text-blue-800 hover:text-blue-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <button
          className={`${
            activeFilter === "department" ? "bg-gray-800" : "bg-gray-500"
          } text-white font-bold py-4 px-6 rounded mr-2 transition duration-300 hover:scale-110 p-3`}
          onClick={() => onFilterClick("department")}
        >
          학과별
        </button>
        <button
          className={`${
            activeFilter === "latest" ? "bg-gray-800" : "bg-gray-500"
          } text-white font-bold py-4 px-6 rounded mr-2 transition duration-300 hover:scale-110 p-3`}
          onClick={() => onFilterClick("latest")}
        >
          최신별
        </button>
        <button
          className={`${
            activeFilter === "period" ? "bg-gray-800" : "bg-gray-500"
          } text-white font-bold py-4 px-6 rounded mr-2 transition duration-300 hover:scale-110 p-3`}
          onClick={() => onFilterClick("period")}
        >
          기간별
        </button>
      </div>
    </div>
  );
}

export default Filtering;
