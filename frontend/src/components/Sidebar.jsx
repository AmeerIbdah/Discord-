import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineAcademicCap,
  HiOutlineCodeBracket,
  HiOutlinePuzzlePiece,
  HiOutlineSparkles,
} from "react-icons/hi2";

const channels = [
  { name: "general", icon: <HiOutlineChatBubbleLeftRight />, tag: "Main" },
  { name: "study", icon: <HiOutlineAcademicCap />, tag: "Team" },
  { name: "react", icon: <HiOutlineCodeBracket />, tag: "Code" },
  { name: "gaming", icon: <HiOutlinePuzzlePiece />, tag: "Fun" },
  { name: "random", icon: <HiOutlineSparkles />, tag: "Talk" },
];

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

function Sidebar({ selectedChannel, setSelectedChannel, onLogout }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <div className="brand-logo">
           <img src="/discord-logo.svg" alt="Logo" />
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
                <strong>{capitalize(channel.name)}</strong>
                <small>{channel.tag}</small>
              </span>

              <span className="channel-dot"></span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;