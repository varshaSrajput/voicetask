export const getTasks = async (req, res) => {
  try {
    const { q, status, priority, due } = req.query
    const filter = {}

    // Text search
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    }

    // Status filter
    if (status && status !== "All") filter.status = status

    // Priority filter
    if (priority && priority !== "All") filter.priority = priority

    // Due date filter
    if (due === "today") {
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      const end = new Date()
      end.setHours(23, 59, 59, 999)
      filter.dueDate = { $gte: start, $lte: end }
    }

    if (due === "past") {
      filter.dueDate = { $lt: new Date() }
    }

    if (due === "upcoming") {
      filter.dueDate = { $gt: new Date() }
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
