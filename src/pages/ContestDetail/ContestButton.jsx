import React from "react";
import Button from "../../components/Button/Button";

export default function ContestButtons({ openModal, apply }) {
  return (
    <div className="flex justify-between mt-12 gap-2 text-2xl">
      <Button label={apply ? "지원완료" : "지원하기"} onClick={openModal} />
      <Button label="추가모집" />
      <Button label="지원현황" />
    </div>
  );
}
