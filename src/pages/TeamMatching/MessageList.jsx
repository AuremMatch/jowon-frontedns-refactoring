const MessageList = ({ messages }) => (
  <div>
    {messages.map((message, index) => (
      <div
        key={index}
        className={`flex p-4 items-center message-item ${
          message.user.id !== 1 ? "reverse" : ""
        }`}
      >
        <img
          src={message.user.avatar}
          alt={message.user.username}
          className="w-20 h-20 rounded-full ml-4"
        />
        <div className="ml-4">{message.message}</div>
      </div>
    ))}
  </div>
);

export default MessageList;
