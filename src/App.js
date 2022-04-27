import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";
import isPrime from "is-prime";

function App() {
  const [number, setNumber] = useState(2);
  const [mode, setMode] = useState("prime");
  const [answer, setAnswer] = useState(false);

  const isFibonacci = (n) => {
    if (n === 0 || n === 1) {
      return true;
    } else {
      let fib = [0, 1];
      let nextFib = fib[0] + fib[1];
      while (nextFib <= n) {
        if (nextFib === n) {
          return true;
        }
        fib = [fib[1], nextFib];
        nextFib = fib[0] + fib[1];
      }
      return false;
    }
  };

  const calculation = useCallback(() => {
    if (mode === "prime") {
      setAnswer(isPrime(number));
    } else {
      setAnswer(isFibonacci(number));
    }
  }, [mode, number]);

  useEffect(() => {
    calculation();
  }, [mode, calculation]);

  return (
    <div className="d-flex w-100">
      <Form.Control
        className="form-control col-1"
        type="number"
        defaultValue={number}
        onChange={(e) =>
          setNumber(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 2)
        }
      ></Form.Control>
      <Form.Control
        className="form-select col-2"
        as="select"
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="prime">isPrime</option>
        <option value="fibo">isFibonacci</option>
      </Form.Control>
      <div className="col-3">{answer ? "True" : "False"}</div>
    </div>
  );
}

export default App;
