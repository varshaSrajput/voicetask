export function parseVoiceText(text) {
  const lower = text.toLowerCase();

  // Priority detection
  let priority = "Medium";
  if (lower.includes("high")) priority = "High";
  if (lower.includes("low")) priority = "Low";

  // Status detection
  let status = "To Do";
  if (lower.includes("in progress")) status = "In Progress";
  if (lower.includes("done") || lower.includes("completed")) status = "Done";

  // Title extraction (simple)
  let title = text;
  if (lower.startsWith("create")) title = text.replace(/create/i, "").trim();
  if (lower.startsWith("add")) title = text.replace(/add/i, "").trim();
  if (lower.startsWith("remind me to"))
    title = text.replace(/remind me to/i, "").trim();

  // Due date parsing
  let dueDate = null;

  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  if (lower.includes("tomorrow")) {
    dueDate = new Date(today.getTime() + oneDay);
  } else if (lower.includes("today")) {
    dueDate = today;
  } else if (lower.includes("in")) {
    const match = lower.match(/in (\d+) days?/);
    if (match) {
      const days = parseInt(match[1], 10);
      dueDate = new Date(today.getTime() + days * oneDay);
    }
  }

  // Fallback title
  if (!title) title = text;

  return {
    title,
    priority,
    status,
    dueDate,
  };
}
