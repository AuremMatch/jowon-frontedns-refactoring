const MessageList = ({ messages }) => (
  <div>
    {messages.map((message, index) => (
      <div
        key={index}
        className={`message-item ${message.user.id !== 1 ? "reverse" : ""}`}
      >
        <img
          src={message.user.avatar}
          alt={message.user.username}
          className="w-20 h-20 rounded-full ml-4"
        />
        <div
          className={`message-content ${
            message.user.id !== 1 ? "bg-teal-500" : "bg-gray-300"
          }`}
        >
          {message.message}
        </div>
      </div>
    ))}
  </div>
);

export default MessageList;
