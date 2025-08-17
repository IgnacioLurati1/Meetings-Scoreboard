import { Routes, Route, Link } from 'react-router-dom'
import Scoreboard from './pages/scoreboard.jsx'

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Scoreboard />} />
      </Routes>
    </div>
  )
}

export default App