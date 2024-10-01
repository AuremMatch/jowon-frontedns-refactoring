import React from "react";
import MiniProfileCard from "./MiniProfileCard";

const MiniProfileList = ({ participants }) => (
  <div className="border w-1/4 p-10">
    <h2 className="text-center w-full block text-lg font-medium">
      Conversation for
    </h2>
    <div className="grid grid-cols-2 justify-between mt-10 items-center">
      {participants.map((participant, index) => (
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
