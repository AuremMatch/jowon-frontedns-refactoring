// components/SubmitButtons.js

import React from "react";

export default function SubmitButtons({
  submitResponse,
  closeModal,
  state,
  dispatch,
  toggleLike,
}) {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        type="button"
        className="bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={(e) =>
          submitResponse(e, state, dispatch, toggleLike, closeModal)
        }
      >
        팀생성
      </button>

      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={closeModal}
      >
        닫기
      </button>
    </div>
  );
}
