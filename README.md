Got it, Varsha.
Here is a **clean, formal, simple-English, human-sounding README** that still follows the PDF structure exactly — but **does not sound like ChatGPT wrote it**.
No robotic tone, no heavy jargon, no over-explanation.
Just clear, natural writing that looks like *you* prepared it thoughtfully.

Copy-paste **as-is**.

---

 Voice-Enabled Task Tracker

This project is a task management application that allows users to create and update tasks using both voice input and a regular UI. The idea is to make task creation faster and more natural by letting users speak normally while the system picks out the important details. The app also provides an organized way to view, search, filter, edit, and manage tasks.

 1. Overview

The application supports:

* Creating tasks from voice commands
* Extracting the title, priority, status, and due date from the spoken input
* Reviewing the interpreted details before saving
* Viewing tasks in a Kanban-style board
* Viewing tasks in a separate list view with more details
* Editing, deleting, and moving tasks between different stages
* Searching and filtering tasks based on multiple criteria

The goal was to keep the interface simple, responsive, and easy to understand while meeting all the requirements from the assignment.

 2. Main Features
Voice Input & Parsing

* Uses the browser’s speech recognition to capture what the user says
* Identifies common patterns like:
  * “tomorrow”, “day after tomorrow”
  * “in 3 days”
  * “next Monday / next Friday”
  * priority terms (“high priority”, “low priority”, etc.)
  * task status terms
* Shows a preview modal so the user can confirm or edit the extracted data before creating the task

Task Management
* Add tasks manually or through voice
* Edit any part of a task (title, description, priority, status, due date)
* Move tasks between “To Do”, “In Progress”, and “Done”
* Delete completed tasks
* Two viewing modes:
     Board View – stage-wise columns
      List View – card-style task details

 Search & Filters
* Search tasks by title or description
* Filter by:

  * Status
  * Priority
  * Due date (past, today, or upcoming)


3. Tech Stack
* Frontend: React (Vite), Axios, Web Speech API
* Backend: Node.js, Express
  Database: MongoDB with Mongoose
This stack was chosen to keep the development straightforward and to meet the requirement of building a simple, clear, full-stack application.

4. Project Structure
```
voicetask/
│
├── frontend/      # React client
└── backend/       # Express server + MongoDB
```
5. Setup Instructions
 **Backend**

```
cd voicetask/backend
npm install
cp .env.example .env
npm start
```
Make sure MongoDB is running locally (via Compass or a local instance).

 **Frontend**
```
cd voicetask/frontend
npm install
npm run dev
```
* Frontend runs on: **[http://localhost:5173](http://localhost:5173)**
* Backend runs on: **[http://localhost:5000](http://localhost:5000)**
  
 6. API Summary
GET /api/tasks
Returns tasks and supports search + filters through query parameters.
**POST /api/task
Creates a new task with the provided details.
**PUT /api/tasks/:id**
Updates any part of an existing task.
**DELETE /api/tasks/:id**
Removes a task.

 7. Notes & Assumptions
* Voice recognition depends on browser support and may vary slightly
* If the due date is not detected from speech, it is left empty
* Default task status is “To Do” when none is mentioned
* Filtering is handled on the backend to keep results consistent
* UI is intentionally kept clean and minimal as per the assignment’s expectations

8. Deliverables Checklist
* Public GitHub repository
* Frontend and backend folders
* `.env.example` included
* README included
* Demo video will be recorded separately



If you'd like, I can help you prepare a **concise demo video script** that matches the assignment tone.
