import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import { parseVoiceText } from "../utils/voiceParser";

const API = "http://localhost:5000/api/tasks";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  // -------- VOICE --------
  let recognition = null;
  if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const txt = e.results[0][0].transcript;
      setText(txt);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  const handleListen = () => {
    if (!recognition) return;
    setText("");
    setListening(true);
    recognition.start();
  };

  // -------- PARSE + CREATE --------
  const handleParse = async () => {
    const input = text.trim();
    if (!input) return;

    const parsed = parseVoiceText(input);

    const payload = {
      title: parsed.title || input,
      description: "",
      priority: parsed.priority || "Medium",
      status: parsed.status || "To Do",
      dueDate: parsed.dueDate || null,
    };

    await axios.post(API, payload);
    setText("");
    load();
  };

  const moveTask = async (task, newStatus) => {
    await axios.put(`${API}/${task._id}`, { ...task, status: newStatus });
    load();
  };

  const deleteTask = async (task) => {
    await axios.delete(`${API}/${task._id}`);
    load();
  };

  const tasksByStatus = (status) =>
    tasks.filter((t) => t.status === status);

  return (
    <div style={{ padding: "24px 40px" }}>
      {/* input + buttons row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <input
          placeholder="Say or type your task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            border: "1px solid #d0d0d0",
            fontSize: 14,
          }}
        />
        <button
          className="primary-btn"
          onClick={handleListen}
          disabled={listening}
        >
          {listening ? "Listening..." : "Listen"}
        </button>
        <button className="primary-btn" onClick={handleParse}>
          Parse
        </button>
      </div>

      {/* columns */}
      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "space-between",
        }}
      >
        <Column title="To Do">
          {tasksByStatus("To Do").map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              mode="todo"
              onMove={() => moveTask(task, "In Progress")}
            />
          ))}
        </Column>

        <Column title="In Progress">
          {tasksByStatus("In Progress").map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              mode="inprogress"
              onMove={() => moveTask(task, "Done")}
            />
          ))}
        </Column>

        <Column title="Done">
          {tasksByStatus("Done").map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              mode="done"
              onDelete={() => deleteTask(task)}
            />
          ))}
        </Column>
      </div>
    </div>
  );
}

function Column({ title, children }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#f5f7ff",
        padding: 20,
        borderRadius: 18,
        minHeight: 380,
      }}
    >
      <h3 style={{ marginBottom: 16 }}>{title}</h3>
      {children}
    </div>
  );
}
