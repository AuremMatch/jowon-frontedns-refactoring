import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaBomb } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { FaFile } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MiniProfileCard from "./MiniProfileCard";
import axiosInstance from "../../utils/axiosInstance";
import useFetchVideo from "../../hooks/useFetchVideo"; // Import custom hook
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import Slider from "react-slick";
import { Radar } from "react-chartjs-2";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

import { FaTrophy, FaMedal, FaStar, FaCheck, FaUpload } from "react-icons/fa";
import { useRef } from "react";
import MessageModal from "../../components/Modal/MessageModal";
import RadarModal from "../../components/Modal/RadarModal";
import TeamEvaluation from "./TeamEvalution";
import MiniProfileList from "./MiniProfileList";
import MessageSection from "./MessageSection";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import PortfolioModal from "../../components/Modal/PortfolioModal";

const NextArrow = (props) => (
  <div {...props}>
    <IoChevronForwardOutline size={56} className="align-middle" />
  </div>
);

const PrevArrow = (props) => (
  <div {...props}>
    <IoChevronBackOutline size={56} className="align-middle" />
  </div>
);

const TeamDetail = () => {
  // Chart.js에 필요한 컴포넌트를 등록합니다.
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  const [isExpanded, setIsExpanded] = useState(true); // 섹션의 확장 상태를 관리합니다.
  const [isThirdExpanded, setIsThirdExpanded] = useState(true); // 세 번째 섹션의 확장 상태를 관리합니다.
  const [messages, setMessages] = useState(""); // 입력된 메시지 상태
  const [loading, setLoading] = useState(false); // 분석 요청 중인지 여부를 나타내는 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [isModalOpens, setIsModalOpens] = useState(false); // 모달 상태 관리
  const [percentages, setPercentages] = useState({});
  const [userData, setUserData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [participants, setParticipants] = useState([]); // 참가자 상태 관리
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isModalOpenRadar, setIsModalOpenRadar] = useState(false);
  const [clickedLabel, setClickedLabel] = useState(null); // 클릭한 레이블 저장

  const [bestCandidate, setBestCandidate] = useState(null);

  const [isPotoModalOpen, setIsPotoModalOpen] = useState(false);

  const [portfolios, setPortfolios] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [errors, setErrors] = useState(null);

  const settings = {
    dots: false, // 점 없애기
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // 커스텀 다음 화살표
    prevArrow: <PrevArrow />, // 커스텀 이전 화살표
  };

  const handlePotoModalOpen = () => {
    setIsPotoModalOpen(true);
  };

  const handlePotoModalClose = () => {
    setIsPotoModalOpen(false);
  };

  useEffect(() => {
    // 포트폴리오 데이터를 가져오는 함수
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/conversations/5/add_portfolio/"
        );
        console.log(response.data);

        setPortfolios(response.data); // 포트폴리오 데이터 설정
      } catch (err) {
        console.error("포트폴리오 데이터를 가져오는 중 오류 발생:", err);
        setErrors(err);
      } finally {
        setLoadings(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handlePotoSubmit = (formData) => {
    // formData를 API에 전송하는 로직 추가
    console.log("Form Data:", formData);
    // API 요청 코드를 추가하세요
  };

  const navigate = useNavigate();
  const chartRef = useRef(null); // 차트 인스턴스 참조

  const navigateToNoti = () => {
    navigate("/pictures/messages");
  };

  const toggleSection = () => {
    // 섹션의 확장 상태를 변경합니다.
    setIsExpanded(!isExpanded);
  };

  const toggleThirdSection = () => {
    setIsThirdExpanded(!isThirdExpanded);
    // setToogle((prev) => prev + 1);
  };

  // Use custom hook
  const { video, setVideo, pendingParticipants, codingScores, id } =
    useFetchVideo();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(
          `http://127.0.0.1:8000/conversations/${id}`
        );
        if (response.status === 204) {
          alert("팀이 성공적으로 삭제되었습니다.");
          navigate("/pictures/messages");
        }
      } catch (error) {
        console.error("팀 삭제 중 오류 발생:", error);
        alert("팀 삭제 중 오류가 발생했습니다.");
      }
    }
  };
  const addBestCandidate = async (clickedLabel) => {
    console.log(clickedLabel);

    try {
      // 서버에서 데이터를 가져오기
      const response = await axiosInstance.get(
        `http://127.0.0.1:8000/conversations/${id}`
      );
      const videoData = response.data;
      console.log("Video Data:", videoData); // 추가된 로그

      if (
        videoData.matching_type === "random" ||
        videoData.matching_type === "same"
      ) {
        const participants = videoData.participants;
        const pending = videoData.pendingParticipants;
        console.log(videoData);
        console.log(pending);

        const codingScores = participants.map(
          (participant) => participant.coding
        );

        // 현재 팀원들의 ID 목록
        const currentParticipantIds = participants.map((p) => p.id);

        console.log("Participants:", participants); // 추가된 로그
        console.log("Coding Scores:", codingScores); // 추가된 로그

        try {
          // 지원자 목록 가져오기
          const applicantsResponse = await axiosInstance.get(
            `http://127.0.0.1:8000/contests/${videoData.contest_id}/applicants/`
          );
          // 여기서 contest_id값 가져오기
          const applicants = applicantsResponse.data;
          console.log("Applicants:", applicants); // 추가된 로그

          // labels와 coding 키를 매핑하는 객체
          const labelToCodingKeyMap = {
            프론트: "frontend_score",
            백엔드: "backend_score",
            디자인: "design_score",
            "ppt/리더쉽": "ppt_score",
            배포: "deploy_score",
          };

          // clickedLabel 값을 coding 키로 변환
          const codingKey = labelToCodingKeyMap[clickedLabel];

          if (!codingKey) {
            console.log(`No matching coding key for label: ${clickedLabel}`);
            return; // 매핑이 안 되면 함수 종료
          }

          // 이후 코드에서 codingKey를 사용
          let bestCandidate = null;
          let maxScore = -Infinity;

          for (const applicant of applicants) {
            console.log("Checking applicant:", applicant);

            if (!applicant.coding) {
              console.log(
                "Skipping applicant because coding is null:",
                applicant
              );
              continue;
            }

            if (!applicant.coding[codingKey]) {
              console.log(
                `Skipping applicant because ${codingKey} is not found:`,
                applicant
              );
              continue;
            }

            if (currentParticipantIds.includes(applicant.id)) {
              console.log(
                "Skipping applicant because they are already a participant:",
                applicant
              );
              continue;
            }

            if (applicant.coding[codingKey] > maxScore) {
              maxScore = applicant.coding[codingKey];
              bestCandidate = applicant;
              console.log("New best candidate found:", bestCandidate);
            }
          }

          if (bestCandidate) {
            console.log(
              "Best Candidate to be added to pending:",
              bestCandidate
            );

            // pendingParticipants가 배열인지 확인
            if (!Array.isArray(pending)) {
              console.error("pendingParticipants is not an array:", pending);
              return;
            }
            console.log(pending);

            // 해당 지원자를 pendingParticipants에 추가
            const updatedParticipants = [...pending, bestCandidate];
            console.log(updatedParticipants);

            // 서버에 업데이트된 participants 전송
            try {
              await axiosInstance.put(
                `http://127.0.0.1:8000/conversations/${id}`,
                {
                  pendingParticipants: updatedParticipants.map((p) => p.id),
                }
              );
              console.log("서버 응답 데이터:", response.data); // 응답 데이터를 로그로 출력

              // video 상태의 participants를 업데이트
              setVideo((prevVideo) => ({
                ...prevVideo,
                pendingParticipants: updatedParticipants,
              }));
              console.log("Participants updated successfully");
              console.log();
            } catch (putError) {
              console.error(
                "Error updating participants on the server:",
                putError
              );
            }
          } else {
            console.log("No suitable candidate found");
          }
        } catch (error) {
          console.error("Error fetching applicants:", error);
        }
      } else {
        console.log("Matching type is not random or same.");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const openModals = () => {
    setIsModalOpens(true);
  };

  const closeModal = () => {
    setIsModalOpens(false);
  };
  const openMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  const handleConfirm = () => {
    console.log("Team member will be added.");
    openMessageModal(); // RadarModal 확인 시 MessageModal 열기

    // addBestCandidate(); // 팀원 추가 로직 호출
    closeModal(); // 모달 닫기
  };
  const handleMessageSubmit = () => {
    addBestCandidate(clickedLabel); // MessageModal에서 메시지 제출 시 addBestCandidate 호출
    closeMessageModal();
  };

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
      pointBackgroundColor: `rgba(${255 - index * 50}, ${
        99 + index * 50
      }, 132, 1)`,
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: `rgba(${255 - index * 50}, ${
        99 + index * 50
      }, 132, 1)`,
    })),
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        grid: {
          color: "#fff", // 그리드 라인의 색상
        },
        pointLabels: {
          display: true,
          font: {
            size: 20,
          },
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
    layout: {
      padding: {
        top: 100, // 상단 패딩
      },
    },
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        // 클릭된 요소가 있는 경우
        console.log(elements);

        const elementIndex = elements[0].index; // 클릭된 요소의 인덱스
        console.log(elementIndex);

        const label = chart.data.labels[elementIndex]; // 해당 요소의 라벨
        console.log("Clicked label:", label);
        setClickedLabel(label);
        // 모달 열기
        openModals();

        // 추가적인 로직을 여기에 추가할 수 있습니다
        // 예: 라벨을 이용하여 특정 작업 수행
      }

      // if (confirmAdd) {
      //   console.log("Team member will be added.");
      //   // addBestCandidate(minAverageLabel);
      //   // 여기에 추가적인 로직을 넣을 수 있습니다.
      //   addBestCandidate();
      // }
    },
  };

  const handleChartClick = (event) => {
    const chart = chartRef.current; // 차트 인스턴스를 가져옴

    if (chart) {
      const elements = chart.getElementsAtEventForMode(
        event,
        "nearest", // 가장 가까운 데이터 포인트를 기준으로 이벤트 처리
        { intersect: true },
        false
      );

      if (elements.length > 0) {
        const clickedIndex = elements[0].index; // 클릭된 요소의 인덱스
        const minAverageLabel = data.labels[clickedIndex]; // 클릭된 요소의 라벨

        const confirmAdd = window.confirm(
          `${minAverageLabel} 라벨에서 가장 높은 점수를 가진 지원자를 팀에 추가하시겠습니까?`
        );

        if (confirmAdd) {
          addBestCandidate(minAverageLabel); // 사용자 확인 시, 후보자 추가 로직 호출
        }
      }
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  // 메시지 전송 함수
  const sendMessage = async () => {
    try {
      // 서버에 메시지를 전송하는 POST 요청
      const conversationId = window.location.pathname.split("/").pop(); // URL에서 대화의 ID 추출
      await axiosInstance.post(
        `http://127.0.0.1:8000/conversations/messages/`,
        {
          message: messages, // 메시지 내용
          conversation_id: id,
          conversation: id,
        }
      );

      // 메시지 전송 후 입력 창 비우기
      setMessages("");
      // 전송 후 새로고침
      window.location.reload();

      // 전송 완료 후 필요한 추가 작업 수행 가능
    } catch (error) {
      console.error("Error sending message:", error);
      // 오류 처리 로직 추가 가능
    }
  };

  return (
    <section id="home" className="">
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
        {isExpanded && (
          <MiniProfileList
            participants={video.participants}
            pending={video.pendingParticipants}
          />
        )}
        <div className="border flex-grow ml-10 p-10 flex flex-col">
          <div className="border mb-6 flex items-center justify-center rounded p-2">
            {video.teamName}
          </div>
          <MessageList messages={video.messages} />
          <MessageInput
            messages={messages}
            setMessages={setMessages}
            sendMessage={sendMessage}
          />
        </div>

        <div
          className={`border w-1/4 p-10 ml-12 flex justify-center flex-col ${
            isThirdExpanded ? "" : "hidden"
          }`}
        >
          <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer ">
            <FaImage className="mr-4" size={24} /> <>사진/동영상</>
          </button>
          <div className="flex justify-between mt-10 items-center"></div>
          <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer ">
            <FaFile className="mr-4" size={24} /> <>파일</>
          </button>
          <div className="flex justify-between mt-10 items-center"></div>
          <button
            className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer"
            onClick={handleDelete}
          >
            <FaBomb className="mr-4" size={24} /> <>팀파기</>
          </button>

          <div className="flex justify-between mt-10 items-center"></div>

          <button
            className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer "
            onClick={handlePotoModalOpen}
          >
            <FaStar className="mr-4" size={24} /> <>성과올리기</>
          </button>
          <input type="file" id="fileInput" style={{ display: "none" }} />

          <div className="flex justify-between mt-10 items-center"></div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-red-400 text-black items-center hover:bg-black hover:text-white cursor-pointer "
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
      {/* 기타 컴포넌트 내용 생략 */}
      {
        <div className="container mx-auto mt-24 mb-40">
          <Slider {...settings}>
            {/* Radar Chart Page */}
            <div className="border p-10 min-h-80">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "800px", height: "800px" }}>
                  <Radar
                    ref={chartRef} // chartRef 연결
                    data={data}
                    options={options}
                    getElementAtEvent={handleChartClick}
                  />
                </div>
              </div>
            </div>

            {/* Portfolio Page */}
            <div className="border p-10 min-h-80">
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  margin: "20px 0",
                }}
              >
                포토폴리오
              </h2>
              {/* 포토폴리오 콘텐츠를 여기에 추가하세요 */}
              <div className="flex flex-col p-4 ">
                {portfolios.length > 0 ? (
                  portfolios.map((portfolio) => (
                    <div
                      key={portfolio.id}
                      className="bg-white shadow-md rounded-lg p-8 transition-transform transform hover:scale-105 text-black mb-4 "
                    >
                      <h3 className=" font-semibold mb-2 font-writeFont text-3xl">
                        {portfolio.title}
                      </h3>
                      <p className="text-gray-600 mb-4 font-writeFont text-2xl">
                        {portfolio.description}
                      </p>
                      {/* {portfolio.image && (
                        <img
                          src={portfolio.image}
                          alt={portfolio.title}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                      )} */}
                      {portfolio.link && (
                        <a
                          href={portfolio.link}
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          자세히 보기
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center" }}>포트폴리오가 없습니다.</p>
                )}
              </div>
            </div>
          </Slider>
        </div>
      }
      <RadarModal
        isOpens={isModalOpens}
        onRequestClose={closeModal}
        onConfirm={handleConfirm}
        label={clickedLabel}
      />
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={closeMessageModal}
        onSubmit={handleMessageSubmit}
        bestCandidate={bestCandidate}
      />
      <PortfolioModal
        isOpen={isPotoModalOpen}
        onClose={handlePotoModalClose}
        onSubmit={handlePotoSubmit}
      />

      <TeamEvaluation
        id={id}
        delete={handleDelete}
        participants={video.participants}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default TeamDetail;
