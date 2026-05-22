import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import socket from "../socket";
import Sidebar from "../components/Sidebar";
import MessageBox from "../components/MessageBox";

function Chat() {
  const navigate = useNavigate();

  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      />

      <main className="chat-area">
        <div className="chat-header">
          <div>
            <h2>#{selectedChannel}</h2>
            <p>Welcome, {user.username}</p>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <MessageBox messages={messages} isLoading={isLoading} />

        <form className="message-form" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder={`Message #${selectedChannel}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}

export default Chat;