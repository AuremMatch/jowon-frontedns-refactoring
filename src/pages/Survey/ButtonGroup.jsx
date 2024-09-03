// components/ButtonGroup.js

import React from "react";

export default function ButtonGroup({ isTeam, dispatch }) {
  return (
    <div className="flex justify-center mb-8">
      <button
        className={`flex-1 py-2 rounded-l-lg ${
          !isTeam ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
        }`}
        onClick={() => dispatch({ type: "TOGGLE_TEAM_MODE", payload: false })}
      >
        개인
      </button>
      <button
        className={`flex-1 py-2 rounded-r-lg ${
          isTeam ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
        }`}
        onClick={() => dispatch({ type: "TOGGLE_TEAM_MODE", payload: true })}
      >
        팀
      </button>
    </div>
  );
}
