import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Vault from "./components/Vault";
import VaultViewItem from "./components/VaultViewItem";
import CryptoJS from "crypto-js";

function App() {
  const [activeEmail, setActiveEmail] = useState("");
  const [activeMasterKey, setActiveMasterKey] = useState("");
  const [activeAuthHash, setActiveAuthHash] = useState("");
  const [vault, setVault] = useState([]);

  useEffect(() => {
    const fetchVault = async () => {
      if (!activeEmail || !activeMasterKey || !activeAuthHash) {
        return;
      }

      const requestBody = {
        email: activeEmail,
        authHash: activeAuthHash,
      };

      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(requestBody),
      });
      const fetchedVault = await response.json();
      setVault(
        fetchedVault.map((vaultItem) => {
          return {
            ...vaultItem,
            password: decryptPassword(vaultItem.password),
          };
        })
      );
    };

    fetchVault();
  });

  const encryptPassword = (password) => {
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encryptedPassword = CryptoJS.AES.encrypt(password, activeMasterKey, {
      iv: iv,
      padding: CryptoJS.pad.Pcks7,
      mode: CryptoJS.mode.CBC,
    });
    return encryptedPassword.toString();
  };

  const decryptPassword = (encryptedPassword, iv) => {
    const decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword,
      activeMasterKey,
      {
        iv: iv,
        padding: CryptoJS.pad.Pcks7,
        mode: CryptoJS.mode.CBC,
      }
    );
    return decryptedPassword.toString(CryptoJS.enc.Utf8);
  };

  const deriveMasterKey = (email, masterPassword) => {
    return CryptoJS.PBKDF2(masterPassword, email, {
      iterations: 100000,
      keySize: 256 / 32,
      hasher: CryptoJS.algo.SHA256,
    });
  };

  const deriveAuthHash = (masterKey, masterPassword) => {
    return CryptoJS.PBKDF2(masterKey, masterPassword, {
      iterations: 10000,
      keySize: 256 / 32,
      hasher: CryptoJS.algo.SHA256,
    }).toString(CryptoJS.enc.Hex);
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
    setActiveEmail(email);
    setActiveMasterKey(currMasterKey);
    setActiveAuthHash(currAuthHash);
    // setVault(
    //   returnedVault.map((vaultItem) => {
    //     return { ...vaultItem, password: decryptPassword(vaultItem.password) };
    //   })
    // );
  };

  const logoutUser = () => {
    setActiveEmail("");
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
          <Route path="/vault/viewItem" element={<VaultViewItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
