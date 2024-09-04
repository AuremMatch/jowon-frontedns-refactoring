import React from "react";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function ContestButtons({ openModal, apply, nav }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = () => {
    navigate(`/contests/${id}/apply`);
  };
  return (
    <div className="flex justify-between mt-12 gap-2 text-2xl">
      <Button label={apply ? "지원완료" : "지원하기"} onClick={openModal} />
      <Button onClick={handleNavigate} label="지원현황" />
      <Button label="추가모집" />
    </div>
  );
}
