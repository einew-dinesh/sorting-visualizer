// App.jsx

import { useState, useEffect, memo } from 'react';
import Bar from './components/bar';
import './App.css'; // Import the CSS file for styling

const DELAY = 100;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MemoizedBar = memo(Bar);

function App() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newBars = Array.from({ length: 50 }, () => ({
      height: Math.floor(Math.random() * 100) + 20,
      color: 'red',
    }));
    setArr(newBars);
  };

  const bubbleSort = async () => {
    let array = [...arr];

    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].color = 'yellow';
        array[j + 1].color = 'yellow';

        setArr([...array]);
        await sleep(DELAY);

        if (array[j].height > array[j + 1].height) {
          let temp = array[j].height;
          array[j].height = array[j + 1].height;
          array[j + 1].height = temp;

          setArr([...array]);
          await sleep(DELAY);
        }

        array[j].color = 'red';

        if (j === array.length - i - 2) {
          array[j + 1].color = 'green';
        } else {
          array[j + 1].color = 'red';
        }

        setArr([...array]);
      }

      if (i === array.length - 2) {
        array[0].color = 'green';
      }

      setArr([...array]);
    }
  };

  const insertionSort = async () => {
    let array = [...arr];

    for (let i = 1; i < array.length; i++) {
      let temp = { ...array[i] };
      let j = i - 1;

      array[j].color = 'yellow';
      array[i].color = 'yellow';
      setArr([...array]);
      await sleep(DELAY);

      while (j >= 0 && array[j].height > temp.height) {
        array[j + 1].height = array[j].height;
        array[j + 1].color = 'red';
        array[j].color = 'yellow';
        j--;

        setArr([...array]);
        await sleep(DELAY);
      }

      array[j + 1].height = temp.height;
      array[j + 1].color = 'red';

      setArr([...array]);
      await sleep(DELAY);
    }
  };

  function smallestInArray(array, startIndex) {
    if (startIndex < 0 || startIndex >= array.length) {
      return -1;
    }

    let smallestIndex = startIndex;

    for (let i = startIndex + 1; i < array.length; i++) {
      if (array[i].height < array[smallestIndex].height) {
        smallestIndex = i;
      }
    }

    return smallestIndex;
  }

  const selectionSort = async () => {
    let array = [...arr];
    for (let i = 0; i < array.length; i++) {
      let smallestIndex = smallestInArray(array, i);
      array[i].color = 'yellow';
      array[smallestIndex].color = 'yellow';

      setArr([...array]);
      await sleep(DELAY);

      if (smallestIndex === i) {
        array[smallestIndex].color = 'green';
      } else {
        let temp = array[smallestIndex].height;
        array[smallestIndex].height = array[i].height;
        array[i].height = temp;
        array[i].color = 'green';
        array[smallestIndex].color = 'red';
      }
      setArr([...array]);
      await sleep(DELAY);
    }
  };

  const quickSort = async () => {
    let array = [...arr];
    await quickSortHelper(array, 0, array.length - 1);
    setArr([...array]);
  };
  
  const quickSortHelper = async (array, low, high) => {
    if (low < high) {
      let pivotIndex = await partition(array, low, high);
      await quickSortHelper(array, low, pivotIndex - 1);
      await quickSortHelper(array, pivotIndex + 1, high);
  
      // Additional check for only two elements in the partition
     
    }
    if(low==high){
      array[high].color = 'green';
    }
    setArr([...array]);
    
  };
  
  
  const partition = async (array, low, high) => {
    let pivot = array[low].height;
    let i = low +1; // Increment i by 1
    let j = high;
  
    while (i <= j) { // Change the condition to <=
      while (i <= j && array[i].height <= pivot) {
        i++;
      }
      while (i <= j && array[j].height > pivot) {
        j--;
      }
      if (i < j) {
        let temp = array[i].height;
        array[i].height = array[j].height;
        array[j].height = temp;
      }
    }
  
    array[low].height = array[j].height;
    array[j].height = pivot;
    array[j].color = 'green';
    
    setArr([...array]);
    await sleep(DELAY);
    return j;
  };


  const mergeSort = async()=>{
    let array = [...arr];
    mergeSortHelper(array,0,array.length-1);

  };

  const mergeSortHelper = async (array,left,right)=>{
    if(left<right){
      let mid =Math.floor((left+right)/2) ;
      mergeSortHelper(array,left,mid);
      mergeSortHelper(array,mid+1,right);

      merge(array,left,mid,right);
      
    }
  }

  const merge = async (array, left, mid, right) => {
    let i = left;
    let j = mid + 1;
    let k = left;
    let newArray = Array.from({ length: right - left + 1 });
  
    while (i <= mid && j <= right) {
      if (array[i].height < array[j].height) {
        newArray[k - left] = { ...array[i] };
        i++;
      } else {
        newArray[k - left] = { ...array[j] };
        j++;
      }
      k++;
  
    }
  
    if (i > mid) {
      while (j <= right) {
        newArray[k - left] = { ...array[j] };
        j++;
        k++;
  
       
      }
    } else {
      while (i <= mid) {
        newArray[k - left] = { ...array[i] };
        i++;
        k++;
  
      }
    }
  
    for (k = left; k <= right; k++) {
      array[k] = { ...newArray[k - left] };
    }
  
    setArr([...array]);
    const delay = new Promise(resolve => setTimeout(resolve, DELAY));
    await delay;
  };
  
  return (
    <div className='container'>

      <div className="button-container">
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={insertionSort}>Insertion Sort</button>
        <button onClick={selectionSort}>Selection Sort</button>
        <button onClick={quickSort}>Quick Sort</button>
        <button onClick={mergeSort}>Merge Sort</button>

      </div>
      <div className="app-container">
        {arr.map((arrE, index) => (
          <MemoizedBar key={index} height={arrE.height} color={arrE.color} />
        ))}
      </div>
      
    </div>
  );
}

export default App;
