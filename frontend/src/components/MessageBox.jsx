function MessageBox({ messages, isLoading }) {
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

            <div>
              <strong>{message.sender}</strong>
              <p>{message.text}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageBox;