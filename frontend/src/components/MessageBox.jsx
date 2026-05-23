function MessageBox({ messages, isLoading }) {
  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderMessageText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="message-link"
          >
            {part}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  if (isLoading) {
    return (
      <div className="messages-box">
        <p className="empty-message">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="messages-box">
      {messages.length === 0 ? (
        <p className="empty-message">No messages yet. Start the conversation!</p>
      ) : (
        messages.map((message) => (
          <div className="message" key={message._id}>
            <div className="avatar">
              {message.sender?.charAt(0).toUpperCase()}
            </div>

            <div className="message-content">
              <div className="message-header">
                <strong>{message.sender}</strong>
              </div>

              <p>{renderMessageText(message.text)}</p>
            </div>

            <span className="message-time">
              {formatTime(message.createdAt)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageBox;