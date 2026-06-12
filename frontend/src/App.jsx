import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [currentBars, setCurrentBars] = useState([]);
  const [speed, setSpeed] = useState(300);
  const [arraySize, setArraySize] = useState(10);

  const generateArray = () => {
    const temp = [];

    for (let i = 0; i < arraySize; i++) {
      temp.push(Math.floor(Math.random() * 300) + 20);
    }

    setArray(temp);
  };

  useEffect(() => {
    generateArray();
  }, []);

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const bubbleSort = async () => {
    setSorting(true);

    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setCurrentBars([j, j + 1]);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          setArray([...arr]);

          await sleep(speed);
        }
      }
    }

    setCurrentBars([]);
    setSorting(false);
  };

  const selectionSort = async () => {
    setSorting(true);

    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        setCurrentBars([minIndex, j]);

        await sleep(speed);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        setArray([...arr]);

        await sleep(speed);
      }
    }

    setCurrentBars([]);
    setSorting(false);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h2>DSA Visualizer</h2>
      </nav>

      <section className="hero">
        <h1>Sorting Visualizer</h1>

        <div>
          <button onClick={generateArray} disabled={sorting}>
            Generate New Array
          </button>

          <button onClick={bubbleSort} disabled={sorting}>
            Bubble Sort
          </button>

          <button onClick={selectionSort} disabled={sorting}>
            Selection Sort
          </button>

          <div style={{ marginTop: "20px" }}>
            <label>Speed: </label>

            <input
              type="range"
              min="50"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />

            <span> {speed} ms</span>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Array Size: </label>

            <input
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
            />

            <span> {arraySize}</span>
          </div>
        </div>

        <div className="array-container">
          {array.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{
                height: `${value}px`,
                backgroundColor: currentBars.includes(index)
                  ? "red"
                  : "cyan",
              }}
            ></div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;