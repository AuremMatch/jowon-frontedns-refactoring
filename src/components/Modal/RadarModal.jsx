import React from "react";
import { Modal as CustomModal } from "./Modal"; // 이미 정의된 Modal 컴포넌트 가져오기

const RadarModal = ({ isOpens, onRequestClose, onConfirm }) => {
  return (
    <CustomModal isOpen={isOpens} closeModal={onRequestClose}>
      <div className="p-4">
        <p className="text-black">
          <span className="font-bold text-2xl">배포</span> 부분에서 가장 높은
          점수를 가진 지원자를 팀에 추가하시겠습니까?
        </p>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-black text-white rounded-md"
            onClick={onConfirm}
          >
            확인
          </button>
          <button
            className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
            onClick={onRequestClose}
          >
            취소
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default RadarModal;
