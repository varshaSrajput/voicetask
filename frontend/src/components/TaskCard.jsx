export default function TaskCard({ task, mode, onMove, onDelete }) {
  return (
    <div
      style={{
        background: "white",
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        fontSize: 14,
      }}
    >
      <p style={{ margin: 0, marginBottom: 4, fontWeight: 600 }}>
        {task.title}
      </p>
      {task.dueDate && (
        <p style={{ margin: 0, marginBottom: 4, fontSize: 12 }}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <p style={{ margin: 0, marginBottom: 8, fontSize: 12 }}>
        Priority: {task.priority || "Medium"}
      </p>

      {mode === "todo" && (
        <button className="primary-btn" onClick={onMove}>
          In Progress
        </button>
      )}

      {mode === "inprogress" && (
        <button className="primary-btn" onClick={onMove}>
          Done
        </button>
      )}

      {mode === "done" && (
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  );
}
