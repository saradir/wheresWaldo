import Homepage from './components/Homepage'
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css'
import Leaderboard from './components/Leaderboard'
import Navbar from './components/Navbar';

function App() {


  return (
    <>
    <Navbar />
    <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />
     </Routes>   
    </>
  )
}

export default App
