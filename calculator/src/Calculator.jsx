
import React, { useState } from "react";
import "./styles.css";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    // If result is shown and a digit/operator is clicked, start new calc
    if (result && ["+", "-", "*", "/", "."].includes(value)) {
      setExpression(result + value);
      setResult("");
    } else if (result && !["+", "-", "*", "/", "."].includes(value)) {
      setExpression(value);
      setResult("");
    } else {
      setExpression(expression + value);
    }
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleEqual = () => {
    try {
      if (expression.trim() === "") {
        setResult("Error");
        return;
      }
      // eslint-disable-next-line no-eval
      const evalResult = eval(expression);
      setResult(evalResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={expression} readOnly />
      <div className="result">{result}</div>
      <div className="buttons">
        {["7", "8", "9", "+"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
        {["4", "5", "6", "-"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
        {["1", "2", "3", "*"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}

        <button onClick={handleClear}>C</button>
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={handleEqual}>=</button>
        <button onClick={() => handleClick("/")}>/</button>
      </div>
    </div>
  );
};

export default Calculator;
