import React, { useState } from "react";
import "./App.css";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const handleAdd = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult("Please enter valid numbers");
    } else {
      setResult(a + b);
    }
  };

  return (
    <div className="calculator-container">
      <h1>Adding Two Numbers</h1>

      <div className="inputs">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
        />
      </div>

      <button onClick={handleAdd}>Add Them!</button>

      {result !== null && (
        <h2 className="result">{result}</h2>
      )}
    </div>
  );
}

export default App;
