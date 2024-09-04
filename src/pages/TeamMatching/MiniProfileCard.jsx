import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

const MiniProfileCard = ({ participant, isFirst }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${participant.id}`);
  };

  return (
    <div
      key={participant.id}
      className="profile-card mt-2"
      onClick={handleClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        position: "relative", // 부모 요소에 relative 적용
      }}
    >
      {isFirst && (
        <FaCrown
          className="text-yellow-500 text-3xl"
          style={{ position: "absolute", top: "-14px" }}
        />
      )}
      <img
        alt={participant.username}
        src={participant.avatar}
        className="profile-picture rounded-full"
        style={{
          height: "50px",
          width: "50px", // 이미지의 너비와 높이를 동일하게 설정
          objectFit: "cover", // 이미지가 영역에 맞게 조정되도록 설정
          marginBottom: "8px", // 이미지 아래 여백 추가
        }}
      />
      <p className="profile-username">{participant.username}</p>
    </div>
  );
};

export default MiniProfileCard;
