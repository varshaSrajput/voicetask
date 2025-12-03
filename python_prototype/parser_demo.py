import re
from datetime import datetime, timedelta

def parse_task(text):
    t = text.lower()

    # priority
    priority = "Medium"
    if "high" in t or "urgent" in t:
        priority = "High"
    elif "low" in t:
        priority = "Low"

    # status
    status = "To Do"
    if "progress" in t:
        status = "In Progress"
    elif "done" in t or "complete" in t:
        status = "Done"

    # due date
    due_date = None
    now = datetime.now()

    if "tomorrow" in t:
        due_date = now + timedelta(days=1)

    if "day after tomorrow" in t:
        due_date = now + timedelta(days=2)

    match_days = re.search(r"in (\d+) days", t)
    if match_days:
        num = int(match_days.group(1))
        due_date = now + timedelta(days=num)

    weekdays = [
        "sunday","monday","tuesday","wednesday","thursday","friday","saturday"
    ]

    for i, day in enumerate(weekdays):
        if f"next {day}" in t:
            target = i
            d = now
            while d.weekday() != target:
                d += timedelta(days=1)
            d += timedelta(days=7)
            due_date = d

    # title extraction
    cleaned = (
        t.replace("create", "")
         .replace("add", "")
         .replace("task", "")
         .strip()
    )

    title = cleaned.capitalize()

    return {
        "title": title,
        "priority": priority,
        "status": status,
        "due_date": due_date.strftime("%Y-%m-%d") if due_date else None
    }


if __name__ == "__main__":
    sample = "Create a high priority task to submit report next Monday"
    print(parse_task(sample))
