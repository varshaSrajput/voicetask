import { useEffect, useRef, useState } from "react"
import { interpretSpeech } from "../utils/voiceParser"

export default function VoiceInput({ onParsed }) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef(null)

  useEffect(() => {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Rec) return

    const rec = new Rec()
    rec.lang = "en-US"
    rec.continuous = true
    rec.interimResults = false

    rec.onstart = () => setListening(true)
    rec.onend = () => setListening(false)

    rec.onresult = e => {
      let full = ""
      for (let i = 0; i < e.results.length; i++) {
        full += e.results[i][0].transcript + " "
      }
      setTranscript(full.trim())
    }

    recognitionRef.current = rec

    return () => {
      rec.abort()
    }
  }, [])

  const startListening = () => {
    if (!recognitionRef.current || listening) return
    setTranscript("")
    recognitionRef.current.start()
  }

  const handleParse = () => {
    if (!transcript) return
    const parsed = interpretSpeech(transcript)
    onParsed(parsed, transcript)
  }

  return (
    <div className="voice-bar">
      <span>{transcript || "Say your task, then hit Parse"}</span>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="primary-btn" onClick={startListening}>
          {listening ? "Listening…" : "Listen"}
        </button>
        <button className="primary-btn" onClick={handleParse}>
          Parse
        </button>
      </div>
    </div>
  )
}
