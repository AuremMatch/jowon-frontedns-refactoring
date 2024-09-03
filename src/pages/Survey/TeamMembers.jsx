// components/TeamMembers.js

import React from "react";
import QuestionsForm from "./QuestionForm";

export default function TeamMembers({
  teamMembers,
  questions,
  dispatch,
  responses,
}) {
  return (
    <div>
      {teamMembers.map((memberId, index) => (
        <div key={index} className="mb-4">
          <h4 className="text-xl mb-2">팀원 {index + 1}</h4>
          <input
            type="text"
            placeholder="팀원 ID"
            value={memberId}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_TEAM_MEMBER",
                payload: { index, value: e.target.value },
              })
            }
            className="w-full border rounded p-3 mb-2 text-black"
          />
          <QuestionsForm
            questions={questions}
            responses={responses}
            dispatch={dispatch}
          />
          <button
            type="button"
            onClick={() =>
              dispatch({ type: "REMOVE_TEAM_MEMBER", payload: index })
            }
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            팀원 삭제
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_TEAM_MEMBER" })}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        팀원 추가
      </button>
    </div>
  );
}
