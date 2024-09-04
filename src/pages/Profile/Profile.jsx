import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import { useProfileData } from "../../hooks/useProfileData"; // 커스텀 훅을 가져옵니다.

const StarRating = ({ totalStars = 5, yellowStars = 0 }) => {
  totalStars = Number.isInteger(totalStars) && totalStars > 0 ? totalStars : 5;
  yellowStars =
    Number.isInteger(yellowStars) && yellowStars >= 0 ? yellowStars : 0;

  const greyStars = totalStars - yellowStars;

  return (
    <div className="flex">
      {[...Array(yellowStars)].map((_, index) => (
        <span key={index} className="text-yellow-500">
          ★
        </span>
      ))}
      {[...Array(greyStars)].map((_, index) => (
        <span key={index} className="text-gray-400">
          ★
        </span>
      ))}
    </div>
  );
};

export default function Profile() {
  const { userData, score, coding, loading, error } = useProfileData();
  const [percentages, setPercentages] = useState({});
  const [currentChart, setCurrentChart] = useState("distribution");
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(score).length > 0) {
      calculateAverages();
    }
  }, [score]);

  const calculateAverages = () => {
    const performanceAverage =
      (
        (score.grade +
          score.github_commit_count +
          score.baekjoon_score +
          score.programmers_score +
          score.certificate_count) /
        5
      ).toFixed(2) * 10;

    const experienceAverage =
      (
        (score.depart +
          score.courses_taken +
          score.major_field +
          score.bootcamp_experience) /
        4
      ).toFixed(2) * 100;

    const resultAverage =
      (
        (score.in_school_award_cnt +
          score.out_school_award_cnt +
          score.coding_test_score +
          score.certificate_score +
          score.aptitude_test_score) /
        5
      ).toFixed(2) * 50;

    setPercentages({
      performance: performanceAverage,
      experience: experienceAverage,
      result: resultAverage,
      trust: userData.average_rating * 50, // 신뢰도 값을 100으로 설정
      creativity: 150, // 창의성 값을 100으로 설정
    });
  };

  const codingData = {
    labels: ["백엔드", "프론트엔드", "디자인", "배포", "PPT"],
    datasets: [
      {
        label: "코딩 데이터",
        data: [
          coding.backend_score,
          coding.frontend_score,
          coding.design_score,
          coding.deploy_score,
          coding.ppt_score,
        ],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const data = {
    labels: ["성과", "성실도", "경험", "신뢰도", "창의성"],
    datasets: [
      {
        label: "내 데이터",
        data: [
          percentages.result,
          percentages.performance,
          percentages.experience,
          percentages.trust,
          percentages.creativity,
        ],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "평균 데이터",
        data: [180, 200, 100, 120, 120], // 평균 데이터는 항상 100%로 설정합니다.
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        grid: {
          color: "#fff", // 레이더 그리드의 색상을 흰색으로 설정
        },
        pointLabels: {
          display: true,
          fontSize: 24,
        },
        ticks: {
          beginAtZero: true,
        },
        pointLabels: {
          display: true,
          font: {
            size: 20, // 라벨 글자 크기를 24px로 설정합니다.
          },
        },
      },
    },
    layout: {
      padding: {
        top: 100, // 상단 패딩을 50px로 설정하여 그래프를 아래로 내립니다.
      },
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigateToNotiME = () => {
    navigate("/notifications/me");
  };

  const handleLinkClick = () => {
    navigate("/profile/form");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="flex flex-col md:flex-row p-4 justify-center mt-36 ">
        {loading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {userData && (
          <>
            <div className="w-1/4 px-20 basis-6/12 mt-8 mb-20 h-auto ">
              <img src={userData.avatar} className="" />
            </div>

            <div className="w-full basis-5/12 flex flex-col p-4 text-left  mb-8">
              <div className="flex items-center py-1 mb-8 ">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  이름
                </span>
                <span className="text-2xl font-dongle_light w-2/3 ">
                  {userData.username}
                </span>
              </div>

              <div className="flex items-center  mb-8">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  신뢰도
                </span>
                <span className="text-2xl font-dongle_light w-2/3 ">
                  <StarRating
                    totalStars={userData.average_rating}
                    yellowStars={userData.average_rating}
                  />
                </span>
              </div>

              <div className="flex items-center  mb-8">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  분야
                </span>
                <span className="text-2xl font-dongle_light w-2/3 ">
                  {userData.개발경력}
                </span>
              </div>

              <div className="flex items-center mb-8 ">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  총획득상금
                </span>
                <span className="text-2xl font-dongle_light w-2/3 ">
                  227만원
                </span>
              </div>

              <div className="flex items-center  mb-12">
                <span className="text-2xl font-dongle_light w-1/3 mr-28">
                  수상 4
                </span>
                <div className="flex flex-col">
                  <div className="text-2xl font-dongle_light   ">
                    2024 | 코딩공모전 금상
                  </div>
                  <div className="text-2xl font-dongle_light   ">
                    2023 | 알고리즘ap 금상
                  </div>
                  <div className="text-2xl font-dongle_light   ">
                    2022 | 전국ai대회 금상
                  </div>
                  <div className="text-2xl font-dongle_light   ">
                    2022 | 전국 crt 금상
                  </div>
                </div>
              </div>

              <div className="flex items-center py-2  mb-12">
                <span className="text-2xl font-dongle_light w-1/3 mr-24">
                  MBTI
                </span>
                <p className="text-2xl font-dongle_light  ">ISTP</p>
              </div>

              <div className="flex items-center py-2">
                <span className="text-2xl font-dongle_light w-1/3 mr-24">
                  자기소개
                </span>
                <button
                  className="text-2xl font-dongle_light text-blue-500 mr-12"
                  onClick={openModal}
                >
                  자기소개 보기
                </button>
              </div>

              {userData && (
                <>
                  <div className="w-full basis-5/12 flex flex-col text-left   justify-center mt-12">
                    {currentChart === "distribution" && (
                      <div>
                        <span className="text-2xl font-dongle_light w-1/3 ">
                          분포도
                        </span>
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
                  <div className="flex justify-center ">
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
              )}

              <span className="flex justify-center ">
                <button
                  onClick={navigateToNotiME}
                  className="w-30 h-12 mr-8 bg-gray-500 font-diphylleia font-bold text-2xl text-white py-2 px-4 rounded-sm hover:brightness-110 mt-12 hover:bg-black"
                >
                  받은제의
                </button>

                <button
                  onClick={handleLinkClick}
                  className="w-30 h-12 mr-8 bg-gray-500 font-diphylleia font-bold text-2xl text-white py-2 px-4 rounded-sm hover:brightness-110 mt-12 hover:bg-black"
                >
                  프로필추가
                </button>
              </span>
              {isModalOpen && (
                <div
                  className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
                  onClick={closeModal}
                >
                  <div
                    className="bg-white p-8 rounded-lg w-1/3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-0 right-0 mr-4 mt-2 text-gray-500 hover:text-gray-700"
                      onClick={closeModal}
                    >
                      X
                    </button>
                    <span className="text-lg font-dongle_light text-black">
                      안녕하세요. 저는 원대 컴퓨터 공학과에 재학 중인
                      윤동규입니다. 프로그래밍의 매력에 빠져들어 다양한
                      프로그래밍 언어와 알고리즘을 익히며 컴퓨터의 원리와 동작
                      메커니즘을 탐구하고 있습니다. 특히, 소프트웨어 개발과
                      관련된 과목에서 뛰어난 성적을 기록하며 높은 프로그래밍
                      실력을 가지고 있습니다. 또한, 이론뿐만 아니라 실무 경험
                      또한 쌓고자 학교 주변에서 다양한 인턴십과 프로젝트를
                      진행해왔습니다. 특히, 최근에는 개인 프로젝트나 경험를 통해
                      웹 개발 능력을 향상시켰습니다.. 그리고 개인 프로젝트 뿐만
                      아니라 팀 프로젝트 수상경험도 있습니다. 팀 프로젝트를 하며
                      조장을 맡았었습니다. 조장을 하며 팀을 이끌어 갈 수 있는
                      능력도 있다고 자신합니다.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
