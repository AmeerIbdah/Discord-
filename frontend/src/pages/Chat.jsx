import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLink } from "react-icons/hi2";
import api from "../services/api";
import socket from "../services/socket";
import Sidebar from "../components/Sidebar";
import MessageBox from "../components/MessageBox";

function Chat() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getChannelTitle = (channel) => {
    return channel
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    const loadChannelMessages = async () => {
      try {
        setIsLoading(true);
        setMessages([]);

        socket.emit("joinChannel", selectedChannel);

        const res = await api.get(`/messages/${selectedChannel}`);
        setMessages(res.data);
      } catch (error) {
        console.log("Error loading messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChannelMessages();

    const handleReceiveMessage = (message) => {
      if (message.channel === selectedChannel) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [selectedChannel, user]);

const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setText((prevText) => {
    if (!prevText.trim()) {
      return `📎 ${file.name}`;
    }

    return `${prevText} 📎 ${file.name}`;
  });

  e.target.value = "";
};

  const sendMessage = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    socket.emit("sendMessage", {
      channel: selectedChannel,
      text: text.trim(),
      sender: user.username,
    });

    setText("");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  if (!user) return null;

  return (
    <div className="chat-page">
      <Sidebar
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        onLogout={logout}
        user={user}
      />

      <main className="chat-area">
        <div className="chat-header">
          <div>
            <h2>{getChannelTitle(selectedChannel)}</h2>
            <p>Welcome, {user.username}</p>
          </div>
        </div>

        <MessageBox messages={messages} isLoading={isLoading} />

        <form className="message-form" onSubmit={sendMessage}>
  <input
    ref={fileInputRef}
    className="hidden-file-input"
    type="file"
    accept="image/*,.pdf,.doc,.docx,.txt,.zip"
    onChange={handleFileChange}
  />

  <div className="message-input-box">
    <input
      type="text"
      placeholder={`Message ${getChannelTitle(selectedChannel)}`}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />

    <button
      type="button"
      className="link-btn"
      title="Add file or image"
      onClick={() => fileInputRef.current?.click()}
    >
      <HiOutlineLink />
    </button>
  </div>

  <button type="submit" className="send-btn">
    Send
  </button>
</form>
      </main>
    </div>
  );
}

export default Chat;