import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const MessageSection = ({ video }) => {
  const [messages, setMessages] = useState("");

  return (
    <div className="border flex-grow ml-10 p-10 flex flex-col">
      <div className="border mb-6 flex items-center justify-center rounded p-2">
        {video.teamName}
      </div>
      <MessageList messages={video.messages} />
      <MessageInput
        messages={messages}
        setMessages={setMessages}
        sendMessage={sendMessage}
        conversationId={video.id}
      />
    </div>
  );
};

export default MessageSection;
