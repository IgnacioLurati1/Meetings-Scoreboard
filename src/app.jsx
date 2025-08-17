import { Routes, Route, Link } from 'react-router-dom';
import Scoreboard from './pages/scoreboard.jsx';
import Navbar from './components/navbar.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Scoreboard />} />
      </Routes>
    </div>
  )
}

export default App