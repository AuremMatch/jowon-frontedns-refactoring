import React from "react";
import MiniProfileCard from "./MiniProfileCard";

const ProfileList = ({ participants }) => {
  return (
    <div className="grid grid-cols-2 justify-between mt-10 items-center">
      {participants.map((participant, index) => (
        <MiniProfileCard
          key={participant.id}
          participant={participant}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};

export default ProfileList;
