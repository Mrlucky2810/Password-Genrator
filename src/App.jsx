import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("Your password will appear here.");
  const [isCopied, setIsCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxzy";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "@!#$*/";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [numAllowed, length, charAllowed, setPassword]);

  const passwordRef = useRef(null);
  const cpyClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="main-container">
      <div className="text-title">
        <h1>Password Generator</h1>
      </div>

      <div className="input-field">
        <input type="text" readOnly value={password} pass={passwordRef} />
        <button
          onClick={cpyClip}
          className={`copy-button ${isCopied ? "copied" : ""}`}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="range">
        <input
          type="range"
          min={6}
          max={18}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <label>Length: {length}</label>
      </div>

      <div className="num-box">
        <input
          type="checkbox"
          id="NumberInput"
          defaultChecked={numAllowed}
          onChange={() => {
            setNumAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="numberInput">Number</label>
      </div>

      <div className="char-box">
        <input
          type="checkbox"
          id="characterInput"
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="characterInput">Character</label>
      </div>
    </div>
  );
};

export default App;
