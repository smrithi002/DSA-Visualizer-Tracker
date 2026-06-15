import Navbar from "./components/Navbar";
import ComplexityPanel from "./components/ComplexityPanel";
import PerformancePanel from "./components/PerformancePanel";
import Tracker from "./components/Tracker";
import "./App.css";

import { useState, useEffect } from "react";

function App() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [currentBars, setCurrentBars] = useState([]);
  const [speed, setSpeed] = useState(300);
  const [arraySize, setArraySize] = useState(10);
  const [algorithmInfo, setAlgorithmInfo] = useState({
  name: "None",
  best: "-",
  average: "-",
  worst: "-",
  space: "-"
});
const [activePage, setActivePage] = useState("visualizer");

const [completedAlgorithms, setCompletedAlgorithms] = useState([]);
const [searchValue, setSearchValue] = useState("");
const [foundIndex, setFoundIndex] = useState(-1);
const [executionTime, setExecutionTime] = useState("-");
const [searchResult, setSearchResult] = useState("");

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
  useEffect(() => {
  const saved = localStorage.getItem("completedAlgorithms");

  if (saved) {
    setCompletedAlgorithms(JSON.parse(saved));
  }
}, []);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const markCompleted = (algorithm) => {
  if (!completedAlgorithms.includes(algorithm)) {
    const updated = [...completedAlgorithms, algorithm];

    setCompletedAlgorithms(updated);

    localStorage.setItem(
      "completedAlgorithms",
      JSON.stringify(updated)
    );
  }
};

  const bubbleSort = async () => {
    const start = performance.now();
    setAlgorithmInfo({
  name: "Bubble Sort",
  best: "O(n)",
  average: "O(n²)",
  worst: "O(n²)",
  space: "O(1)"
});
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
    markCompleted("Bubble Sort");
    const end = performance.now();
setExecutionTime(`${(end - start).toFixed(2)} ms`);
  };
  

  const selectionSort = async () => {
    const start = performance.now();
    setAlgorithmInfo({
  name: "Selection Sort",
  best: "O(n²)",
  average: "O(n²)",
  worst: "O(n²)",
  space: "O(1)"
});
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
    markCompleted("Selection Sort");
    const end = performance.now();
setExecutionTime(`${(end - start).toFixed(2)} ms`);
  };

  
  const insertionSort = async () => {
    const start = performance.now();
    setAlgorithmInfo({
  name: "Insertion Sort",
  best: "O(n)",
  average: "O(n²)",
  worst: "O(n²)",
  space: "O(1)"
});
    setSorting(true);

    let arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        setCurrentBars([j, j + 1]);

        arr[j + 1] = arr[j];

        setArray([...arr]);
        await sleep(speed);

        j--;
      }

      arr[j + 1] = key;

      setArray([...arr]);
      await sleep(speed);
    }
setCurrentBars([]);
    setSorting(false);
    markCompleted("Insertion Sort");
    const end = performance.now();
setExecutionTime(`${(end - start).toFixed(2)} ms`);
  };
 

  const merge = async (arr, left, mid, right) => {
  let leftArr = arr.slice(left, mid + 1);
  let rightArr = arr.slice(mid + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    setCurrentBars([k]);

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }

    setArray([...arr]);
    await sleep(speed);
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;

    setArray([...arr]);
    await sleep(speed);
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;

    setArray([...arr]);
    await sleep(speed);
  }
};
const mergeSortHelper = async (arr, left, right) => {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  await mergeSortHelper(arr, left, mid);
  await mergeSortHelper(arr, mid + 1, right);

  await merge(arr, left, mid, right);
};
const mergeSort = async () => {
  const start = performance.now();
  setAlgorithmInfo({
    name: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)"
  });

  setSorting(true);

  let arr = [...array];

  await mergeSortHelper(arr, 0, arr.length - 1);

  setCurrentBars([]);
  setSorting(false);
  markCompleted("Merge Sort");
  const end = performance.now();
setExecutionTime(`${(end - start).toFixed(2)} ms`);
};

const partition = async (arr, low, high) => {
  const pivot = arr[high];

  let i = low - 1;

  for (let j = low; j < high; j++) {
    setCurrentBars([j, high]);

    await sleep(speed);

    if (arr[j] < pivot) {
      i++;

      [arr[i], arr[j]] = [arr[j], arr[i]];

      setArray([...arr]);

      await sleep(speed);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  setArray([...arr]);

  await sleep(speed);

  return i + 1;
};
const quickSortHelper = async (arr, low, high) => {
  if (low < high) {
    const pi = await partition(arr, low, high);

    await quickSortHelper(arr, low, pi - 1);

    await quickSortHelper(arr, pi + 1, high);
  }
};
const quickSort = async () => {
  const start = performance.now();
  setAlgorithmInfo({
    name: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)"
  });

  setSorting(true);

  let arr = [...array];

  await quickSortHelper(arr, 0, arr.length - 1);

  setCurrentBars([]);

  setSorting(false);
  markCompleted("Quick Sort");
  const end = performance.now();
setExecutionTime(`${(end - start).toFixed(2)} ms`);
};


const linearSearch = async () => {
  const start = performance.now();

  markCompleted("Linear Search");

  setSorting(true);

  const target = Number(searchValue);

  setFoundIndex(-1);
  setSearchResult("");

  let found = false;

  for (let i = 0; i < array.length; i++) {
    setCurrentBars([i]);

    await sleep(speed);

    if (array[i] === target) {
      setFoundIndex(i);
      setSearchResult(`Found at index ${i}`);
      found = true;
      break;
    }
  }

  if (!found) {
    setSearchResult("Value not found");
  }

  setCurrentBars([]);
  setSorting(false);

  const end = performance.now();
  setExecutionTime(`${(end - start).toFixed(2)} ms`);
};


const binarySearch = async () => {
  const start = performance.now();

  markCompleted("Binary Search");

  setSorting(true);

  const sortedArray = [...array].sort((a, b) => a - b);

  setArray(sortedArray);

  const target = Number(searchValue);

  let left = 0;
  let right = sortedArray.length - 1;

  setFoundIndex(-1);
  setSearchResult("");

  let found = false;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    setCurrentBars([left, mid, right]);

    await sleep(speed);

    if (sortedArray[mid] === target) {
      setFoundIndex(mid);
      setSearchResult(`Found at index ${mid}`);
      found = true;
      break;
    }

    if (sortedArray[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (!found) {
    setSearchResult("Value not found");
  }

  setCurrentBars([]);
  setSorting(false);

  const end = performance.now();

  setExecutionTime(`${(end - start).toFixed(2)} ms`);
};


  return (
    <div className="app">
      <Navbar />

      <section className="hero">
        <div style={{ marginBottom: "20px" }}>
  <button onClick={() => setActivePage("visualizer")}>
    Visualizer
  </button>

  <button onClick={() => setActivePage("tracker")}>
    Tracker
  </button>
</div>
        <h1>Sorting Visualizer</h1>
        
{activePage === "tracker" ? (
  <Tracker
    completedAlgorithms={completedAlgorithms}
    setCompletedAlgorithms={
      setCompletedAlgorithms
    }
  />
) : (
  <>
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

      <button onClick={insertionSort} disabled={sorting}>
        Insertion Sort
      </button>

      <button onClick={mergeSort} disabled={sorting}>
        Merge Sort
      </button>

      <button onClick={quickSort} disabled={sorting}>
        Quick Sort
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

        <span>{speed} ms</span>
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

        <span>{arraySize}</span>
      </div>
    </div>

   <ComplexityPanel algorithmInfo={algorithmInfo} />
    <PerformancePanel executionTime={executionTime} />
<div style={{ marginTop: "20px" }}>
  <input
    type="number"
    placeholder="Enter number to search"
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
  />

  <button onClick={linearSearch} disabled={sorting}>
    Linear Search
  </button>

  <button onClick={binarySearch} disabled={sorting}>
    Binary Search
  </button>
</div>
<h3>{searchResult}</h3>
  <div
  className="array-container"
  style={{
    overflowX: "auto",
    width: "100%",
    paddingTop: "20px",
  }}
>
  {array.map((value, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="array-bar"
        style={{
          height: `${value}px`,
          backgroundColor:
            foundIndex === index
              ? "lime"
              : currentBars.includes(index)
              ? "red"
              : "cyan",
        }}
      ></div>

      <span
        style={{
          color: "white",
          marginTop: "5px",
          fontSize: "14px",
        }}
      >
        {value}
      </span>
    </div>
  ))}
</div>
  </>
)}

      </section>
    </div>
  );
}

export default App;