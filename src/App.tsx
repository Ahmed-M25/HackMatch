import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Connect from "./pages/Connect";
import Matches from "./pages/Matches";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/matches" element={<Matches />} />
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
