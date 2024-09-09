import React from "react";

export const ProfileModal = ({ isModalOpen, closeModal }) => {
  return (
    isModalOpen && (
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
            안녕하세요. 저는 원대 컴퓨터 공학과에 재학 중인 윤동규입니다.
            프로그래밍의 매력에 빠져들어 다양한 프로그래밍 언어와 알고리즘을
            익히며 컴퓨터의 원리와 동작 메커니즘을 탐구하고 있습니다. 특히,
            소프트웨어 개발과 관련된 과목에서 뛰어난 성적을 기록하며 높은
            프로그래밍 실력을 가지고 있습니다. 또한, 이론뿐만 아니라 실무 경험
            또한 쌓고자 학교 주변에서 다양한 인턴십과 프로젝트를 진행해왔습니다.
            특히, 최근에는 개인 프로젝트나 경험를 통해 웹 개발 능력을
            향상시켰습니다.. 그리고 개인 프로젝트 뿐만 아니라 팀 프로젝트
            수상경험도 있습니다. 팀 프로젝트를 하며 조장을 맡았었습니다. 조장을
            하며 팀을 이끌어 갈 수 있는 능력도 있다고 자신합니다.
          </span>
        </div>
      </div>
    )
  );
};
