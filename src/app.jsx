import { Routes, Route, Link } from 'react-router-dom';
import Scoreboard from './pages/scoreboard.jsx';
import { useState } from 'react';
import Navbar from './components/navbar.jsx';
import LoginModal from './components/loginModal.jsx';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Navbar openModal={() => setModalOpen(true)} />
      <LoginModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Routes>
        <Route path="/" element={<Scoreboard />} />
      </Routes>
    </div>
  )
}

export default App