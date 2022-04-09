import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PBKDF2 from "crypto-js/pbkdf2";
import AES from "crypto-js/aes";
import Hex from "crypto-js/enc-hex";

function App() {
  const [activeMasterKey, setActiveMasterKey] = useState("");
  const [activeAuthHash, setActiveAuthHash] = useState("");

  const deriveMasterKey = (email, masterPassword) => {
    return PBKDF2(masterPassword, email, {
      iterations: 100000,
      keySize: 256 / 32,
    });
  };

  const deriveAuthHash = (masterKey, masterPassword) => {
    return PBKDF2(masterKey, masterPassword, {
      iterations: 10000,
      keySize: 256 / 32,
    }).toString(Hex);
  };

  const signupUser = async (email, password) => {
    console.log(email, password);
    const newMasterKey = deriveMasterKey(email, password);
    setActiveMasterKey(newMasterKey);
    const newAuthHash = deriveAuthHash(newMasterKey, password);
    setActiveAuthHash(newAuthHash);

    const requestBody = {
      email,
      authHash: newAuthHash,
    };

    const response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      return true;
    }
    setActiveMasterKey(newMasterKey);
    setActiveAuthHash(newAuthHash);
    return false;
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
