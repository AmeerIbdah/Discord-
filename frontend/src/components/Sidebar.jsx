const channels = [
  { name: "general", icon: "◇", tag: "Main" },
  { name: "study", icon: "✦", tag: "Team" },
  { name: "react", icon: "⌘", tag: "Code" },
  { name: "gaming", icon: "⬡", tag: "Fun" },
  { name: "random", icon: "✧", tag: "Talk" },
];

function Sidebar({ selectedChannel, setSelectedChannel }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">D</div>

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
              <strong>{channel.name}</strong>
              <small>{channel.tag}</small>
            </span>

            <span className="channel-dot"></span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;