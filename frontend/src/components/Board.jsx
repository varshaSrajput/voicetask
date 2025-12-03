import Column from "./Column"

export default function Board({ tasks, reload }) {
  const todo = tasks.filter(t => t.status === "To Do")
  const progress = tasks.filter(t => t.status === "In Progress")
  const done = tasks.filter(t => t.status === "Done")

  return (
    <div className="board">
      <Column title="To Do" tasks={todo} reload={reload} />
      <Column title="In Progress" tasks={progress} reload={reload} />
      <Column title="Done" tasks={done} reload={reload} />
    </div>
  )
}
