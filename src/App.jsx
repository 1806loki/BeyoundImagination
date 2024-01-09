import Navbar from "./components/Navbar/Navbar";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
