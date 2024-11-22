import React, { useState } from "react";
import MiniProfileCard from "./MiniProfileCard";
import ValueModal from "../../components/Modal/ValueModal";
import axiosInstance from "../../utils/axiosInstance";

const TeamEvaluation = ({ participants, isOpen, onClose, id }) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [ratings, setRatings] = useState({});
  const [evaluations, setEvaluations] = useState({});

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(
          `http://127.0.0.1:8000/conversations/${id}`
        );
        if (response.status === 204) {
          alert("팀이 성공적으로 삭제되었습니다.");
        }
      } catch (error) {
        console.error("팀 삭제 중 오류 발생:", error);
        alert("팀 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSubmit = async () => {
    const userId = 1; // 현재 사용자 ID (수정 필요)

    for (const participant of participants) {
      const participantId = participant.id;
      const rating = ratings[participantId];
      const evaluation = evaluations[participantId];

      try {
        // 별점 POST 요청
        if (rating) {
          const ratingResponse = await axiosInstance.post(
            "http://127.0.0.1:8000/ratings/",
            {
              rater: userId, // 평가 작성자 ID
              ratee: participantId, // 평가 대상 ID
              activity_score: rating, // 예: 별점 필드
              accuracy_score: rating,
              teamwork_score: rating,
              overall_score: rating,
            }
          );
          console.log(
            `Rating submitted for ${participant.name}:`,
            ratingResponse.data
          );
        }

        // 평가 POST 요청
        if (evaluation) {
          const evaluationResponse = await axiosInstance.post(
            "http://127.0.0.1:8000/ratings/evaluations/",
            {
              user: userId, // 평가 작성자 ID
              target_user: participantId, // 평가 대상 ID
              comment: evaluation, // 평가 내용
            }
          );
          console.log(
            `Evaluation submitted for ${participant.name}:`,
            evaluationResponse.data
          );
        }
      } catch (error) {
        console.error(
          `Error submitting data for ${participant.name}:`,
          error.response?.data || error.message
        );
      }
    }

    // 초기화 및 모달 닫기
    setRatings({});
    setEvaluations({});
    onClose();
    alert("평가와 별점이 성공적으로 제출되었습니다.");
  };

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
  };

  const handleAction = async () => {
    try {
      // handleSubmit 실행
      await handleSubmit();
      console.log("Ratings and evaluations submitted successfully.");

      // handleDelete 실행
      await handleDelete();
      console.log("Team deleted successfully.");
    } catch (error) {
      console.error("Error during handleAction:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // const handleEvaluationSubmit = () => {
  //   console.log(
  //     `Evaluation for ${selectedParticipant.first_name}: ${evaluation}`
  //   );
  //   setEvaluation("");
  //   setSelectedParticipant(null);
  //   onClose();
  // };

  const handleStarClick = (participant) => {
    setSelectedParticipant(participant);
  };

  const handleRatingChange = (participantId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [participantId]: rating,
    }));
  };
  const handleEvaluationChange = (participantId, value) => {
    setEvaluations((prevEvaluations) => ({
      ...prevEvaluations,
      [participantId]: value,
    }));
  };

  return (
    <ValueModal isOpen={isOpen} onClose={onClose} title="팀원평가">
      <div className="h-[60vh] overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              onClick={() => handleParticipantClick(participant)}
              className={`border rounded p-4 cursor-pointer ${
                selectedParticipant?.id === participant.id
                  ? "bg-gray-100 border-teal-500"
                  : "border-gray-300"
              }`}
            >
              <MiniProfileCard participant={participant} />
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`w-6 h-6 text-2xl ${
                      (ratings[participant.id] || 0) >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(participant.id, star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {selectedParticipant && (
          <div className="mt-6 p-4 border-t text-black">
            <h3 className="text-xl mb-2 text-center">
              {selectedParticipant.username}에 대한 평가
            </h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Write your evaluation..."
              value={evaluations[selectedParticipant.id] || ""}
              onChange={(e) =>
                handleEvaluationChange(selectedParticipant.id, e.target.value)
              }
            />
            <button
              className="mt-4 w-full bg-teal-500 text-white px-4 py-2 rounded"
              onClick={handleAction}
            >
              제출
            </button>
          </div>
        )}
      </div>
    </ValueModal>
  );
};

export default TeamEvaluation;
