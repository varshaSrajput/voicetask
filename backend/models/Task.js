import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: String, 
    status: String,   
    dueDate: Date
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;

