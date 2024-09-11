import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { FaBomb, FaFile, FaImage, FaStar } from "react-icons/fa";

import RadarModal from "../../components/Modal/RadarModal";
import { useTeamDetail } from "../../reducer/useTeamDetail";
import TeamEvaluation from "./TeamEvalution";
import useModal from "../../hooks/useModal";
import axiosInstance from "../../utils/axiosInstance";
import MiniProfileCard from "./MiniProfileCard";
import { useSendMessage } from "../../hooks/useSendMessage";
import MessageInput from "./MessageInput";
import TeamActions from "./TeamActions";

// Chart.js에 필요한 컴포넌트를 등록합니다.
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function TeamDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/").pop();
  const { state, dispatch } = useTeamDetail(id);
  const { video, codingScores, messages, isExpanded, isThirdExpanded } = state;
  const [isModalOpens, setIsModalOpens] = useState(false); // 모달 상태 관리

  const openModals = () => {
    setIsModalOpens(true);
  };

  const closeModal = () => {
    setIsModalOpens(false);
  };

  const {
    isOpen: isMessageModalOpen,
    openModal: openMessageModal,
    closeModal: closeMessageModal,
  } = useModal();

  const {
    isOpen: isTeamEvaluationOpen,
    openModal: openTeamEvaluationModal,
    closeModal: closeTeamEvaluationModal,
  } = useModal();

  const toggleSection = () => dispatch({ type: "TOGGLE_EXPANDED" });
  const toggleThirdSection = () => dispatch({ type: "TOGGLE_THIRD_EXPANDED" });
  const handleFileChange = (e) =>
    dispatch({ type: "SET_SELECTED_FILE", payload: e.target.files[0] });

  const {
    sendMessage,
    loading: messageLoading,
    error: messageError,
  } = useSendMessage(id);

  const handleSendMessage = async () => {
    const success = await sendMessage(messages);
    if (success) {
      dispatch({ type: "SET_MESSAGES", payload: "" });
      window.location.reload(); // 메시지 전송 후 페이지를 새로고침합니다.
    }
  };

  if (!video) return <div>Loading...</div>;

  const data = {
    labels: ["프론트", "백엔드", "디자인", "ppt/리더쉽", "배포"],
    datasets: codingScores.map((score, index) => ({
      label: `팀원 ${index + 1} 데이터`,
      data: [
        score.frontend_score,
        score.backend_score,
        score.design_score,
        score.ppt_score,
        score.deploy_score,
      ],
      fill: true,
      backgroundColor: `rgba(${255 - index * 50}, ${
        99 + index * 50
      }, 132, 0.2)`,
      borderColor: `rgba(${255 - index * 50}, ${99 + index * 50}, 132, 1)`,
    })),
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        grid: {
          color: "#fff",
        },
        pointLabels: {
          display: true,
          font: { size: 16, weight: "bold" }, // 글꼴 크기 및 가중치 조정
          color: "#fff", // 색상 변경
        },
        ticks: { beginAtZero: true, color: "#fff" }, // 눈금 색상 변경
      },
    },
    layout: {
      padding: { top: 50 }, // 레이아웃 조정
    },
    onClick: (event) => {
      console.log("레이더클릭");

      openModals();
    },
  };
  const handleConfirm = () => {
    console.log("Team member will be added.");
    openMessageModal(); // RadarModal 확인 시 MessageModal 열기

    // addBestCandidate(); // 팀원 추가 로직 호출
    closeModal(); // 모달 닫기
  };

  return (
    <section id="home" className="bg-gray-900 text-white">
      <div className="relative w-full h-0" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/imgs/talking.jpg"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-white text-5xl font-serif">
            Team's talking
          </h1>
        </div>
      </div>
      <div className="container mx-auto my-10 mt-32 flex justify-between min-h-50vh">
        <div className="flex justify-center">
          <button onClick={toggleSection} className="focus:outline-none">
            {!isExpanded ? (
              <FiChevronLeft size={64} />
            ) : (
              <FiChevronRight size={64} />
            )}
          </button>
        </div>
        <div
          className={`border w-1/4 p-6 bg-gray-800 rounded-lg ${
            isExpanded ? "" : "hidden"
          }`}
        >
          <span className="text-center w-full block text-lg font-medium">
            <h2>Conversation for </h2>
          </span>
          <div className="grid grid-cols-2 justify-between mt-10 items-center">
            {video.participants.map((participant, index) => (
              <MiniProfileCard
                key={participant.id}
                participant={participant}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
        <div className="border flex-grow ml-10 p-6 flex flex-col bg-gray-800 rounded-lg">
          <div className="border mb-6 flex items-center justify-center rounded p-2 bg-gray-700 text-white">
            {video.teamName}
          </div>
          <MessageInput
            messages={messages}
            handleSendMessage={handleSendMessage}
            setMessage={(msg) =>
              dispatch({ type: "SET_MESSAGES", payload: msg })
            }
          />
        </div>
        <div
          className={`border w-1/4 p-6 ml-12 flex justify-center flex-col bg-gray-800 rounded-lg ${
            isThirdExpanded ? "" : "hidden"
          }`}
        >
          {isThirdExpanded && (
            <TeamActions
              dispatch={dispatch}
              handleFileChange={(e) =>
                dispatch({
                  type: "SET_SELECTED_FILE",
                  payload: e.target.files[0],
                })
              }
              openTeamEvaluationModal={openTeamEvaluationModal}
            />
          )}
        </div>
        <div className="flex justify-center">
          <button onClick={toggleThirdSection} className="focus:outline-none">
            {!isThirdExpanded ? (
              <FiChevronRight size={64} />
            ) : (
              <FiChevronLeft size={64} />
            )}
          </button>
        </div>
      </div>
      <div className="border p-10 container mx-auto min-h-80 mt-24 mb-40 bg-gray-800 rounded-lg">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "800px", height: "800px" }}>
            <Radar data={data} options={options} />
          </div>
        </div>
        {isModalOpens && (
          <RadarModal
            isOpen={isModalOpens}
            onRequestClose={closeModal}
            onConfirm={handleConfirm}
          />
        )}
      </div>
      <TeamEvaluation
        participants={video.participants}
        isOpen={isTeamEvaluationOpen}
        onClose={closeTeamEvaluationModal}
      />
    </section>
  );
}
