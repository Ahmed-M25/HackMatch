import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Home from "./pages/Home";
import FormCard from './components/FormCard';
import AuthForm from './pages/AuthForm';
import Connect from "./pages/Connect";
import Matches from "./pages/Matches";
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';  
import Navbar from "./components/Navbar";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "white",
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
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
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
