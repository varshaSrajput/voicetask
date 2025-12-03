import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ListView from "./pages/ListView"

export default function App() {
  const [tab, setTab] = useState("board")

  return (
    <>
      <Navbar tab={tab} setTab={setTab} />
      {tab === "board" ? <Home /> : <ListView />}
    </>
  )
}
