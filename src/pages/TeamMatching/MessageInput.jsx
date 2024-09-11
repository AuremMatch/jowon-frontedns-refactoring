// MessageInput.js
import React from "react";

export default function MessageInput({
  messages,
  handleSendMessage,
  setMessage,
}) {
  return (
    <div className="mt-6 flex items-center w-full justify-center text-black">
      <input
        type="text"
        className="rounded w-10/12 border-gray-300 border p-2 mr-2 focus:outline-none focus:border-teal-500"
        placeholder="메시지를 입력하세요..."
        value={messages}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSendMessage}
        className="font-customFont bg-teal-500 text-white px-8 py-2 text-2xl rounded-lg focus:outline-none flex items-center hover:bg-teal-700 transition duration-300 ease-in-out"
      >
        Send
      </button>
    </div>
  );
}
