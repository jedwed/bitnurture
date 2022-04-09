import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Vault from "./components/Vault";
import PBKDF2 from "crypto-js/pbkdf2";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import Hex from "crypto-js/enc-hex";
import VaultItem from "./components/VaultItem";

function App() {
  const [activeMasterKey, setActiveMasterKey] = useState("");
  const [activeAuthHash, setActiveAuthHash] = useState("");
  const [vault, setVault] = useState([]);

  const encryptPassword = (password) => {
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encryptedPassword = AES.encrypt(password, activeMasterKey, {
      iv: iv,
    });
    return encryptedPassword;
  };

  const decryptPassword = (encryptedPassword, iv) => {
    AES.decrypt(encryptedPassword, activeMasterKey, {
      iv: iv,
    });
  };

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
    const newMasterKey = deriveMasterKey(email, password);
    const newAuthHash = deriveAuthHash(newMasterKey, password);

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
      const responseJson = await response.json();
      const error = responseJson["error"];
      return error;
    }
  };

  const loginUser = async (email, password) => {
    const currMasterKey = deriveMasterKey(email, password);
    const currAuthHash = deriveAuthHash(currMasterKey, password);

    const requestBody = {
      email,
      authHash: currAuthHash,
    };

    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const responseJson = await response.json();
      const error = responseJson["error"];
      return error;
    }
    const returnedVault = await response.json();
    setActiveMasterKey(currMasterKey);
    setActiveAuthHash(currAuthHash);
    setVault(
      returnedVault.map((vaultItem) => {
        return { ...vaultItem, password: decryptPassword(vaultItem.password) };
      })
    );
  };

  const logoutUser = () => {
    setActiveMasterKey("");
    setActiveAuthHash("");
    setVault([]);
  };

  const addVaultItem = () => {};
  const editVaultItem = () => {};
  const deleteVaultItem = () => {};

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={loginUser} />} />
          <Route path="/signup" element={<Signup onSignup={signupUser} />} />
          <Route
            path="/vault"
            element={
              <Vault
                vault={vault}
                onLogout={logoutUser}
                onAdd={addVaultItem}
                onEdit={editVaultItem}
                onDelete={deleteVaultItem}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
