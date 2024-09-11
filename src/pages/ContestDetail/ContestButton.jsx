import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function ContestButtons({
  openModal,
  apply: initialApply,
  nav,
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  // 지원 상태를 localStorage에서 불러오거나, 초기값으로 설정
  const [apply, setApply] = useState(() => {
    const savedApply = localStorage.getItem(`applyStatus_${id}`);
    return savedApply ? JSON.parse(savedApply) : initialApply;
  });

  useEffect(() => {
    // 지원 상태가 바뀔 때마다 localStorage에 저장
    localStorage.setItem(`applyStatus_${id}`, JSON.stringify(apply));
  }, [apply, id]);

  const handleNavigate = () => {
    navigate(`/contests/${id}/apply`);
  };

  const handleApplyClick = () => {
    // apply가 false일 때만 openModal을 실행하고 상태를 변경
    if (!apply) {
      setApply(true); // 지원 완료 상태로 변경
      openModal(); // 모달 오픈
    }
  };

  return (
    <div className="flex justify-between mt-12 gap-2 text-2xl">
      <Button
        label={apply ? "지원완료" : "지원하기"}
        onClick={handleApplyClick}
      />
      <Button onClick={handleNavigate} label="지원현황" />
      <Button label="추가모집" />
    </div>
  );
}
