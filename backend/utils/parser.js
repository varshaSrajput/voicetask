export function parseVoiceText(text) {
  const t = text.toLowerCase()

  let priority = "Medium"
  if (t.includes("high") || t.includes("urgent")) priority = "High"
  if (t.includes("low")) priority = "Low"

  let status = "To Do"
  if (t.includes("progress")) status = "In Progress"
  if (t.includes("done") || t.includes("complete")) status = "Done"

  let due = null
  if (t.includes("tomorrow")) {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    due = d
  }

  const cleaned = t
    .replace("create", "")
    .replace("add", "")
    .replace("task", "")
    .replace("make", "")
    .trim()

  const title = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

  return { title, priority, status, dueDate: due }
}
