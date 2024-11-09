import React from "react";
import MiniProfileCard from "./MiniProfileCard";

const MiniProfileList = ({ participants, pending }) => (
  <div className="border w-1/4 p-10">
    <h2 className="text-center w-full block text-lg font-medium">
      참여중인 팀원들
    </h2>
    <div className="grid grid-cols-2 justify-between mt-4 items-center border-b p-4">
      {participants.map((participant, index) => (
        <MiniProfileCard
          key={participant.id}
          participant={participant}
          isFirst={index === 0}
        />
      ))}
    </div>
    <h2 className="text-center w-full block text-lg font-medium mt-2  ">
      대기중인 팀원
    </h2>
    <div className="grid grid-cols-2 justify-between mt-4 items-center border-b p-4">
      {pending.map((participant, index) => (
        <MiniProfileCard
          key={participant.id}
          participant={participant}
          isFirst={index === 0}
        />
      ))}
    </div>
  </div>
);

export default MiniProfileList;
