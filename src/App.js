import "./App.css";
import Exp from "./components/Exp";
import { useEffect, useState } from "react";
import ExpGeneralUpdate from "./components/ExpGeneralUpdate";

function App() {
  const [expData, setExpData] = useState([]);
  const chartSize = { width: 800, height: 600 };
  const addItem = () => {
    const newItem = {
      name: `Item ${expData.length + 1}`,
      value: Math.ceil(Math.random() * 33 + 5),
    };

    setExpData([...expData, newItem]);
  };

  const removeItem = () => {
    if (expData.length === 0) return;

    const updatedItems = [...expData];

    // Remove last item in the array
    updatedItems.pop();

    setExpData([...updatedItems]);
  };

  const resetItems = () => {
    setExpData([]);
  };

  return (
    <div className="App">
      <div>
        <button className={"my-button"} onClick={addItem}>Add Item</button>
        <button className={"my-button"} onClick={removeItem}>Remove Item</button>
        <button className={"my-button"} onClick={resetItems}>Remove All</button>
      </div>
      <div>
        {/* <Exp inputData={expData} chartSize={chartSize} /> */}
        <ExpGeneralUpdate inputData={expData} chartSize={chartSize} />
      </div>
    </div>
  );
}

export default App;
