import { useEffect, useState } from "react"
import axios from "axios"
import VoiceInput from "../components/VoiceInput"
import Modal from "../components/Modal"
import Board from "../components/Board"

const API = "http://localhost:5000/api/tasks"

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [preview, setPreview] = useState(null)

  const load = async () => {
    try {
      const res = await axios.get(API)
      setTasks(res.data)
    } catch (e) {
      console.error("load error", e)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleVoice = (parsed, transcript) => {
    setPreview({ parsed, transcript })
  }

  const create = async () => {
    try {
      await axios.post(API, preview.parsed)
      setPreview(null)
      load()
    } catch (e) {
      console.error("create error", e)
    }
  }

  return (
    <div>
      <VoiceInput onParsed={handleVoice} />

      {preview && (
        <Modal
          parsed={preview.parsed}
          transcript={preview.transcript}
          onConfirm={create}
          onClose={() => setPreview(null)}
        />
      )}

      <Board tasks={tasks} reload={load} />
    </div>
  )
}
