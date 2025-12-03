export default function Navbar({ tab, setTab }) {
  return (
    <div className="navbar">
      <div>Assignment (Voice)</div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          className="primary-btn"
          onClick={() => setTab("board")}
          style={{ background: tab === "board" ? "#1b32d1" : "#6e7cf3" }}
        >
          Board
        </button>

        <button
          className="primary-btn"
          onClick={() => setTab("list")}
          style={{ background: tab === "list" ? "#1b32d1" : "#6e7cf3" }}
        >
          List
        </button>
      </div>

      <div>Varsha</div>
    </div>
  )
}
