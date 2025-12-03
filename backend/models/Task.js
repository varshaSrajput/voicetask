import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: { type: String, default: "Medium" },
    status: { type: String, default: "To Do" },
    dueDate: Date
  },
  { timestamps: true }
)

export default mongoose.model("Task", TaskSchema)
