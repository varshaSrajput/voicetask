import TaskCard from "./TaskCard"

export default function Column({ title, tasks, reload }) {
  return (
    <div className="column">
      <h3>{title}</h3>
      {tasks.map(t => (
        <TaskCard key={t._id} task={t} reload={reload} />
      ))}
    </div>
  )
}
