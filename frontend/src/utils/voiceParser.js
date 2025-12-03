export function interpretSpeech(text) {
  const t = text.toLowerCase()

  let priority = "Medium"
  if (t.includes("high") || t.includes("urgent")) priority = "High"
  if (t.includes("low")) priority = "Low"

  let status = "To Do"
  if (t.includes("progress")) status = "In Progress"
  if (t.includes("done") || t.includes("complete")) status = "Done"

  let dueDate = null
  const now = new Date()

  if (t.includes("tomorrow")) {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    dueDate = d
  }

  if (t.includes("day after tomorrow")) {
    const d = new Date()
    d.setDate(d.getDate() + 2)
    dueDate = d
  }

  // in X days
  const matchDays = t.match(/in (\d+) days/)
  if (matchDays) {
    const d = new Date()
    d.setDate(d.getDate() + parseInt(matchDays[1]))
    dueDate = d
  }

  // next Monday, next Friday, etc
  const weekdays = [
    "sunday","monday","tuesday","wednesday","thursday","friday","saturday"
  ]
  for (let i = 0; i < weekdays.length; i++) {
    if (t.includes("next " + weekdays[i])) {
      const d = new Date()
      const target = i
      while (d.getDay() !== target) {
        d.setDate(d.getDate() + 1)
      }
      d.setDate(d.getDate() + 7)
      dueDate = d
    }
  }

  // clean text to get the title
  const cleaned = t
    .replace("create", "")
    .replace("add", "")
    .replace("task", "")
    .replace("make", "")
    .trim()

  const title = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

  return { title, priority, status, dueDate }
}
