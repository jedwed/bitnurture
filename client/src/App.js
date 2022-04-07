import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const signupUser = (email, password, confirmPassword) => {
    return true;
  };
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup onSignup={signupUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
