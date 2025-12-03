
import axios from "axios"

const API = "http://localhost:5000/api/tasks"

export default function TaskCard({ task, reload }) {
  const moveToProgress = async () => {
    await axios.put(`${API}/${task._id}`, { status: "In Progress" })
    reload()
  }

  const moveToDone = async () => {
    await axios.put(`${API}/${task._id}`, { status: "Done" })
    reload()
  }

  const remove = async () => {
    await axios.delete(`${API}/${task._id}`)
    reload()
  }

  return (
    <div className="task-card">
      <span>{task.title}</span>

      {task.status === "To Do" && (
        <button className="primary-btn" onClick={moveToProgress}>
          In Progress
        </button>
      )}

      {task.status === "In Progress" && (
        <button className="primary-btn" onClick={moveToDone}>
          Done
        </button>
      )}

      {task.status === "Done" && (
        <button className="delete-btn" onClick={remove}>
          Delete
        </button>
      )}
    </div>
  )
}
