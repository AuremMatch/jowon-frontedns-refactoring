// components/QuestionsForm.js

import React from "react";

export default function QuestionsForm({ questions, responses, dispatch }) {
  return (
    <div>
      {questions.map((question, index) => (
        <div className="mb-8" key={index}>
          <label
            htmlFor={`question${index + 1}`}
            className="block mb-2 text-black"
          >{`질문 ${index + 1}: ${question.text}`}</label>
          <select
            id={`question${index + 1}`}
            name={`question${index + 1}`}
            className="w-full border rounded p-3 text-black"
            onChange={(e) =>
              dispatch({
                type: "SET_RESPONSES",
                payload: {
                  name: e.target.name,
                  value: e.target.value,
                },
              })
            }
            value={responses[`question${index + 1}`] || ""}
          >
            <option value="">선택해주세요</option>
            {question.choices.map((choice, idx) => (
              <option key={idx} value={choice[0]} className="text-black">
                {choice[1]}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
