import { useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/tasks"

export default function EditTaskModal({ task, onClose, reload }) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || "")
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus] = useState(task.status)
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.substring(0, 10) : ""
  )

  const save = async () => {
    await axios.put(`${API}/${task._id}`, {
      title,
      description,
      priority,
      status,
      dueDate
    })
    reload()
    onClose()
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 10,
          width: 380
        }}
      >
        <h3>Edit Task</h3>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          style={{ width: "100%", padding: 8, height: 70, marginBottom: 8 }}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />

        <button className="primary-btn" onClick={save}>
          Save
        </button>
        <button
          onClick={onClose}
          style={{ marginLeft: 8, padding: "8px 16px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
