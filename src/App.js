import React, { useState } from "react";
import copy from "./copy.svg";
import "./App.css";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Character";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(26);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const generatePasswordTemplate = () => {
    if (
      !includeUpperCase &&
      !includeLowerCase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      NotificationManager.error("Выбери хотя бы 1 чекбокс");
    } else {
      let paswordTemplate = "";
      if (includeNumbers) {
        paswordTemplate = paswordTemplate + numbers;
      }
      if (includeUpperCase) {
        paswordTemplate = paswordTemplate + upperCaseLetters;
      }
      if (includeLowerCase) {
        paswordTemplate = paswordTemplate + lowerCaseLetters;
      }
      if (includeSymbols) {
        paswordTemplate = paswordTemplate + specialCharacters;
      }
      setPassword(generatePassword(paswordTemplate));
      NotificationManager.success("Пароль сгенерирован");
    }
  };
  const generatePassword = (paswordTemplate) => {
    let password = "";
    let passwordTemplateLength = paswordTemplate.length;
    for (let i = 0; i < passwordLength; i++) {
      password += paswordTemplate.charAt(
        Math.floor(Math.random() * passwordTemplateLength)
      );
    }
    return password;
  };
  const copyPassword = () => {
    if (password === "") {
      NotificationManager.error("Нельзя скопировать пустой пароль");
    } else {
      navigator.clipboard.writeText(password);
      NotificationManager.success("Пароль скопирован");
    }
  };
  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator__header">Password Generator</h2>
          <div className="generator__password">
            <h3>{password}</h3>
            <button onClick={copyPassword} className="copy__btn">
              <img src={copy} className="copy"></img>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-length">Password length</label>
            <input
              className="password-length-input"
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-length"
              name="password-length"
              max="26"
              min="8"
            />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
            <input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
            <input
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
            />
          </div>
          <button onClick={generatePasswordTemplate} className="generator__btn">
            Generate Password
          </button>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default App;
