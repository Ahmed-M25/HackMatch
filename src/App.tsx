import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import Home from "./pages/Home";
import FormCard from './components/FormCard';
import AuthForm from './pages/AuthForm';
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
            <Route path="/login" element={
              <FormCard>
                <AuthForm formType="login" />
              </FormCard>
            } />
            <Route path="/signup" element={
              <FormCard>
                <AuthForm formType="signup" />
              </FormCard>
            } />
            <Route path="/connect" element={<Connect />} />
            <Route path="/matches" element={<Matches />} />
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
