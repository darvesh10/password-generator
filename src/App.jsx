import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css"; // Importing CSS for animations and styles

const PasswordManager = () => {
  const [password, setPassword] = useState("");
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [includeChars, setIncludeChars] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const passwordRef = useRef(null);

  // Function to generate a secure password
  const generatePassword = useCallback(() => {
    let chars = "";
    if (includeChars) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()";
    
    if (chars.length === 0) return;
    
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  }, [includeChars, includeNumbers, includeSymbols]);

  // Function to copy password to clipboard
  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy");
    }
  }, []);

  // Function to save password
  const savePassword = useCallback(() => {
    if (password && !savedPasswords.includes(password)) {
      const updatedPasswords = [...savedPasswords, password];
      setSavedPasswords(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords)); // for mainataing result await...
    }
  }, [password, savedPasswords]);

  // Function to delete saved passwords
  const deletePasswords = useCallback(() => {
    setSavedPasswords([]);
    localStorage.removeItem("passwords");
  }, []);

  // Load saved passwords from local storage on mount
  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
    setSavedPasswords(storedPasswords);
  }, []);

  return (
    <div className="password-manager">
      <h2>Password Manager</h2>
      <div className="input-container">
        <input
          ref={passwordRef}
          type="text"
          value={password}
          readOnly
          className="password-input"
        />
        <button onClick={copyToClipboard} className="copy-btn">Copy</button>
      </div>
      <div className="options">
        <label><input type="checkbox" checked={includeChars} onChange={() => setIncludeChars(!includeChars)} /> Include Letters</label>
        <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> Include Numbers</label>
        <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Include Symbols</label>
      </div>
      <button onClick={generatePassword} className="generate-btn">Generate Password</button>
      <button onClick={savePassword} className="save-btn">Save Password</button>
      <button onClick={deletePasswords} className="delete-btn">Delete All Passwords</button>
      <h3>Saved Passwords</h3>
      <ul className="saved-passwords">
        {savedPasswords.map((pass, index) => (
          <li key={index} className="password-item">{pass}</li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordManager;


