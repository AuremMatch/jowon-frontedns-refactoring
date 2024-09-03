import React from "react";
import useModal from "../hooks/useModal";
import { Modal } from "../components/Modal/Modal";

export default function AppWrap(Component) {
  return function WrappedComponent(props) {
    const { isOpen, openModal, closeModal } = useModal();

    return (
      <>
        <Component {...props} openModal={openModal} />
        <Modal isOpen={isOpen} closeModal={closeModal}>
          {/* 여기에 공통 모달 내용을 넣을 수 있습니다 */}
          <h2 className="text-xl font-bold">지원하기</h2>
          <p>지원하시겠습니까?</p>
          <button
            onClick={closeModal}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            닫기
          </button>
        </Modal>
      </>
    );
  };
}
