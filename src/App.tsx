import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Connect from './pages/Connect'
import Navbar from './components/Navbar';

function App() {


  return(
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Connect />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
