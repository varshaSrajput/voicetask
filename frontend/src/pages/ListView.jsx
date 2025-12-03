import { useEffect, useState } from "react"
import axios from "axios"
import EditTaskModal from "../components/EditTaskModal"

const API = "http://localhost:5000/api/tasks"

export default function ListView() {
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")
  const [due, setDue] = useState("All")
  const [editTask, setEditTask] = useState(null)

  const load = async () => {
    const res = await axios.get(API, {
      params: { q: query, status, priority, due }
    })
    setTasks(res.data)
  }

  useEffect(() => {
    load()
  }, [query, status, priority, due])

  return (
    <div style={{ padding: 20 }}>
      <h2>List View</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <input
          placeholder="Search by title or description"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />

        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>All</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select value={due} onChange={e => setDue(e.target.value)}>
          <option>All</option>
          <option value="today">Today</option>
          <option value="past">Past</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {tasks.map(task => (
        <div
          key={task._id}
          style={{
            padding: 15,
            background: "white",
            borderRadius: 12,
            marginBottom: 12,
            boxShadow: "0 2px 6px rgba(0,0,0,0.07)"
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <p>
            Due:{" "}
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
          </p>

          <button
            className="primary-btn"
            onClick={() => setEditTask(task)}
            style={{ marginTop: 8 }}
          >
            Edit
          </button>
        </div>
      ))}

      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          reload={load}
        />
      )}
    </div>
  )
}
