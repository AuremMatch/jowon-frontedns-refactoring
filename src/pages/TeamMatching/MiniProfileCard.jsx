// MiniProfileCard.js
import React from "react";

export default function MiniProfileCard({ participant, isFirst }) {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <img
        alt={participant.username}
        src={participant.avatar}
        className={`w-16 h-16 rounded-full ${
          isFirst ? "bg-teal-500" : "bg-gray-300"
        }`}
      />
      <span className="text-white mt-2">{participant.username}</span>
    </div>
  );
}
