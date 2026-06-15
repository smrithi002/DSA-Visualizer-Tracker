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
  };

  const selectionSort = async () => {
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
  };

  const insertionSort = async () => {
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
<div
  style={{
    marginTop: "30px",
    padding: "20px",
    border: "1px solid white",
    borderRadius: "10px",
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  <h3>{algorithmInfo.name}</h3>

  <p>Best Case: {algorithmInfo.best}</p>

  <p>Average Case: {algorithmInfo.average}</p>

  <p>Worst Case: {algorithmInfo.worst}</p>

  <p>Space Complexity: {algorithmInfo.space}</p>
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