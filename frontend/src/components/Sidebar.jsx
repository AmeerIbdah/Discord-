import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineAcademicCap,
  HiOutlineCodeBracket,
  HiOutlinePuzzlePiece,
  HiOutlineSparkles,
} from "react-icons/hi2";

const channels = [
  {
    name: "general",
    label: "General",
    icon: <HiOutlineChatBubbleLeftRight />,
    tag: "Main",
  },
  {
    name: "announcements",
    label: "Announcements",
    icon: <HiOutlineSparkles />,
    tag: "News",
  },
  {
    name: "study-room",
    label: "Study Room",
    icon: <HiOutlineAcademicCap />,
    tag: "Study",
  },
  {
    name: "code-lab",
    label: "Code Lab",
    icon: <HiOutlineCodeBracket />,
    tag: "Code",
  },
  {
    name: "random",
    label: "Random",
    icon: <HiOutlinePuzzlePiece />,
    tag: "Talk",
  },
];

function Sidebar({ selectedChannel, setSelectedChannel, onLogout, user }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <div className="brand-logo">
            <img src="/discord-logo.svg" alt="Discord Logo" />
          </div>

          <div>
            <h2>Discord Clone</h2>
            <span>Neon Chat Space</span>
          </div>
        </div>

        <div className="channels">
          <p>Channels</p>

          {channels.map((channel) => (
            <button
              key={channel.name}
              className={`channel-item ${
                selectedChannel === channel.name ? "active-channel" : ""
              }`}
              onClick={() => setSelectedChannel(channel.name)}
            >
              <span className="channel-icon">{channel.icon}</span>

              <span className="channel-info">
                <strong>{channel.label}</strong>
                <small>{channel.tag}</small>
              </span>

              <span className="channel-dot"></span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="user-card">
          <div className="user-avatar">
            {user?.username?.charAt(0).toUpperCase()}
            <span className="online-dot"></span>
          </div>

          <div className="user-info">
            <strong>{user?.username}</strong>
            <span>Online</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;