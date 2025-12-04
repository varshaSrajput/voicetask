import Task from "../models/Task.js";

// CREATE
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// GET (WITH FILTERS)
export const getTasks = async (req, res) => {
  try {
    const { q, status, priority, due } = req.query;

    const filter = {};

    if (status && status !== "All") filter.status = status;

    if (priority && priority !== "All") filter.priority = priority;

    if (q && q.trim() !== "") {
      const regex = new RegExp(q.trim(), "i");
      filter.$or = [{ title: regex }, { description: regex }];
    }

    if (due && due !== "All") {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

      if (due === "past") filter.dueDate = { $lt: startOfToday };
      if (due === "today") filter.dueDate = { $gte: startOfToday, $lt: endOfToday };
      if (due === "upcoming") filter.dueDate = { $gte: endOfToday };
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// UPDATE
export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
