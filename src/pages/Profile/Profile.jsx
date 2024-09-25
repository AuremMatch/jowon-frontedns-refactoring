import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileData } from "../../hooks/useProfileData"; // 커스텀 훅을 가져옵니다.
import { ProfileInfo } from "./ProfileInfo";
import { ProfileChart } from "./ProfileChart";
import { ProfileModal } from "./ProfileModal";
import { ProfileActions } from "./ProfileActions";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for radar chart
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Profile() {
  const { userData, score, coding, loading, error } = useProfileData();
  const [percentages, setPercentages] = useState({});
  const [currentChart, setCurrentChart] = useState("distribution");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateToNotiME = () => {
    navigate("/notifications/me");
  };

  const handleLinkClick = () => {
    navigate("/profile/form");
  };

  return (
    <section className="flex flex-col md:flex-row p-4 justify-center mt-36">
      {loading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {userData && (
        <div className="flex flex-row w-full">
          {/* 이미지 부분 */}
          <div className="w-1/2 px-8 mt-8 mb-20 h-auto">
            <img
              src={userData.avatar}
              className="w-full h-auto"
              alt="User Avatar"
            />
          </div>

          {/* 텍스트 부분 */}
          <div className="w-1/2 px-8 flex flex-col justify-start">
            <div className="mb-8">
              <ProfileInfo userData={userData} />
            </div>

            <div className="mb-8">
              <ProfileChart
                currentChart={currentChart}
                setCurrentChart={setCurrentChart}
                data={data}
                codingData={codingData}
                options={options}
              />
            </div>

            <div className="flex justify-center mb-8 ml-12">
              <ProfileActions
                navigateToNotiME={navigateToNotiME}
                handleLinkClick={handleLinkClick}
              />
            </div>

            <ProfileModal isModalOpen={isModalOpen} closeModal={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
}
