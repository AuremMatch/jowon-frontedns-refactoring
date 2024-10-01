import React from "react";

const MessageInput = ({ messages, setMessages, sendMessage }) => {
  return (
    <div className="mt-6 flex items-center w-full justify-center text-black">
      <input
        type="text"
        className="rounded w-10/12 border-gray-300 border p-2 mr-2 focus:outline-none focus:border-teal-500"
        placeholder="메시지를 입력하세요..."
        value={messages}
        onChange={(e) => setMessages(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-teal-500 text-white px-10 items-center rounded focus:outline-none flex"
        style={{ flexDirection: "row" }}
      >
        <span className="w-8 py-3">전송</span>
      </button>
    </div>
  );
};

export default MessageInput;
