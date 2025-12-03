export default function Modal({ parsed, transcript, onConfirm, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 10,
          width: 360
        }}
      >
        <h3>Review task</h3>
        <p>Transcript: {transcript}</p>
        <p>Title: {parsed.title}</p>
        <p>Priority: {parsed.priority}</p>
        <p>Status: {parsed.status}</p>
        <button className="primary-btn" onClick={onConfirm}>
          Create
        </button>
        <button style={{ marginLeft: 8 }} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
