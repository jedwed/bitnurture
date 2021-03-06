import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Vault from "./components/Vault";
import CryptoJS from "crypto-js";

function App() {
  const [activeEmail, setActiveEmail] = useState("");
  const [activeMasterKey, setActiveMasterKey] = useState("");
  const [activeAuthHash, setActiveAuthHash] = useState("");
  const [vault, setVault] = useState([]);

  // Constantly fetches the vault from the server
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
            password: decryptPassword(
              vaultItem.password,
              CryptoJS.enc.Hex.parse(vaultItem.iv)
            ),
          };
        })
      );
    };

    fetchVault();
  });

  // Encrypt user-provided/generated password, return both the encrypted password and initialization vector
  const encryptPassword = (password) => {
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encryptedPassword = CryptoJS.AES.encrypt(password, activeMasterKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    return [encryptedPassword.toString(), iv.toString()];
  };

  // Decrypts provided encrypted password
  const decryptPassword = (encryptedPassword, iv) => {
    const decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword,
      activeMasterKey,
      {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      }
    );
    return decryptedPassword.toString(CryptoJS.enc.Utf8);
  };

  // Generate a 256-bit AES master key to encrypt/decrypt vault
  const deriveMasterKey = (email, masterPassword) => {
    return CryptoJS.PBKDF2(masterPassword, email, {
      iterations: 100000,
      keySize: 256 / 32,
      hasher: CryptoJS.algo.SHA256,
    });
  };

  // Generate the hash that gets sent to the server for authentication
  const deriveAuthHash = (masterKey, masterPassword) => {
    return CryptoJS.PBKDF2(masterKey, masterPassword, {
      iterations: 10000,
      keySize: 256 / 32,
      hasher: CryptoJS.algo.SHA256,
    }).toString(CryptoJS.enc.Hex);
  };

  // Create new account
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

  // Login
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
    setActiveEmail(email);
    setActiveMasterKey(currMasterKey);
    setActiveAuthHash(currAuthHash);
  };

  const logoutUser = () => {
    setActiveEmail("");
    setActiveMasterKey("");
    setActiveAuthHash("");
    setVault([]);
  };

  // Generates a random 16-character password
  const generatePassword = () => {
    const length = 16;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()`~-_=+[{]};:,<.>/?";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  // Insert item into vault
  const addVaultItem = async (name, username, password) => {
    const [encryptedPassword, iv] = encryptPassword(password);

    const requestBody = {
      email: activeEmail,
      authHash: activeAuthHash,
      name: name,
      username: username,
      password: encryptedPassword,
      iv: iv,
    };

    const response = await fetch("http://127.0.0.1:5000/vault", {
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

  // Delete item in vault
  const deleteVaultItem = async (id) => {
    const requestBody = {
      email: activeEmail,
      authHash: activeAuthHash,
      id: id,
    };

    const response = await fetch("http://127.0.0.1:5000/vault", {
      method: "DELETE",
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

  // Edit item in vault
  const editVaultItem = async (id, name, username, password) => {
    const [encryptedPassword, iv] = encryptPassword(password);

    const requestBody = {
      email: activeEmail,
      authHash: activeAuthHash,
      id: id,
      name: name,
      username: username,
      password: encryptedPassword,
      iv: iv,
    };

    const response = await fetch("http://127.0.0.1:5000/vault", {
      method: "PUT",
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
                onGenerate={generatePassword}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
