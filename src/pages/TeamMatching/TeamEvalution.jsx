import React, { useState } from "react";

import MiniProfileCard from "./MiniProfileCard";
import ValueModal from "../../components/Modal/ValueModal";

const TeamEvaluation = ({ participants, isOpen, onClose }) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [evaluation, setEvaluation] = useState("");
  const [ratings, setRatings] = useState({});

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
  };

  const handleEvaluationSubmit = () => {
    // 간단한 평가 제출 로직 추가
    console.log(
      `Evaluation for ${selectedParticipant.first_name}: ${evaluation}`
    );
    setEvaluation("");
    setSelectedParticipant(null);
    onClose();
  };

  // 별점 클릭 핸들러
  const handleStarClick = (participantId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [participantId]: rating,
    }));
  };

  return (
    <ValueModal isOpen={isOpen} onClose={onClose} title="팀원평가">
      <div className="grid grid-cols-2 gap-4 text-black">
        {participants.map((participant) => (
          <div key={participant.id}>
            <MiniProfileCard participant={participant} />
            {/* 별점 영역 */}
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`w-6 h-6 text-2xl ${
                    (ratings[participant.id] || 0) >= star
                      ? "text-yellow-500" // 클릭한 별은 노란색
                      : "text-gray-300" // 기본 색상은 회색
                  }`}
                  onClick={() => handleStarClick(participant.id, star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedParticipant && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">
            Evaluate {selectedParticipant.first_name}
          </h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Write your evaluation..."
            value={evaluation}
            onChange={(e) => setEvaluation(e.target.value)}
          />
          <button
            className="mt-2 bg-teal-500 text-black px-4 py-2 rounded"
            onClick={handleEvaluationSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </ValueModal>
  );
};

export default TeamEvaluation;
