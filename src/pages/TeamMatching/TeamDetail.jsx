import React from "react";
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

  // useModal 훅 사용
  const {
    isOpen: isRadarModalOpen,
    openModal: openRadarModal,
    closeModal: closeRadarModal,
  } = useModal();

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
      dispatch({ type: "TOGGLE_MODAL_OPENS" });
    },
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
          {video.messages.map((message, index) => (
            <div
              key={index}
              className={`mb-10 flex items-center ${
                message.user.id !== 1 ? "flex-row-reverse" : ""
              }`}
            >
              <img
                alt={message.user.username}
                src={message.user.avatar}
                className={`w-16 h-16 rounded-full ml-4 ${
                  message.user.id !== 1
                    ? "bg-teal-500 text-black"
                    : "bg-gray-300"
                }`}
              />
              <div
                className={`p-4 rounded-lg ${
                  message.user.id !== 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
                style={{ marginLeft: message.user.id !== 1 ? "0" : "12px" }}
              >
                <div>{message.message}</div>
              </div>
            </div>
          ))}
          <div className="mt-6 flex items-center w-full justify-center text-black">
            <input
              type="text"
              className="rounded w-10/12 border-gray-300 border p-2 mr-2 focus:outline-none focus:border-teal-500"
              placeholder="메시지를 입력하세요..."
              value={messages}
              onChange={(e) =>
                dispatch({ type: "SET_MESSAGES", payload: e.target.value })
              }
            />
            <button
              onClick={handleSendMessage}
              className="font-customFont bg-teal-500 text-white px-8 py-2 text-2xl   rounded-lg focus:outline-none flex items-center hover:bg-teal-700 transition duration-300 ease-in-out"
            >
              send
            </button>
          </div>
        </div>
        <div
          className={`border w-1/4 p-6 ml-12 flex justify-center flex-col bg-gray-800 rounded-lg ${
            isThirdExpanded ? "" : "hidden"
          }`}
        >
          <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg">
            <FaImage className="mr-4" size={24} /> <>사진/동영상</>
          </button>
          <div className="flex justify-between mt-10 items-center"></div>
          <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg">
            <FaFile className="mr-4" size={24} /> <>파일</>
          </button>
          <div className="flex justify-between mt-10 items-center"></div>
          <button
            className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg"
            onClick={() => dispatch({ type: "TOGGLE_MODAL_OPENS" })}
          >
            <FaBomb className="mr-4" size={24} /> <>팀파기</>
          </button>
          <div className="flex justify-between mt-10 items-center"></div>
          <button
            className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <FaStar className="mr-4" size={24} /> <>성과올리기</>
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className="flex justify-between mt-10 items-center"></div>
          <button
            onClick={openTeamEvaluationModal}
            className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-red-500 text-white items-center hover:bg-red-700 hover:text-white cursor-pointer transition duration-300 ease-in-out rounded-lg"
          >
            <FiX className="mr-4" size={24} /> <>활동종료</>
          </button>
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
        <RadarModal
          isOpen={isRadarModalOpen}
          onRequestClose={closeRadarModal}
          onConfirm={closeRadarModal}
        />
      </div>
      <TeamEvaluation
        participants={video.participants}
        isOpen={isTeamEvaluationOpen}
        onClose={closeTeamEvaluationModal}
      />
    </section>
  );
}
