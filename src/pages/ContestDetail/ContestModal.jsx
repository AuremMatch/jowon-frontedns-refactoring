import React from "react";
import { Modal } from "../../components/Modal/Modal";

export default function ContestModal({ isOpen, closeModal }) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold">지원하기</h2>
      <p>지원하시겠습니까?</p>
      <button
        onClick={closeModal}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        닫기
      </button>
    </Modal>
  );
}
