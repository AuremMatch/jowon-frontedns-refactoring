// components/SubmitButtons.js

import React from "react";
import Button from "../../components/Button/Button";

export default function SubmitButtons({
  submitResponse,
  closeModal,
  state,
  dispatch,
  toggleLike,
}) {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <Button
        label="팀생성"
        type="button"
        onClick={(e) =>
          submitResponse(e, state, dispatch, toggleLike, closeModal)
        }
      >
        팀생성
      </Button>

      <Button label="닫기" type="button" onClick={closeModal}>
        닫기
      </Button>
    </div>
  );
}
