import React, { useEffect, useState } from "react";

const GenData = ({ cbUpdateData }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    cbUpdateData(items);
  });
  const addItem = () => {
    // Creating a new item based on the current length of the items array
    const newItem = {
      name: `Item ${items.length + 1}`,
      value: Math.ceil(Math.random() * 50),
    };
    // Updating the state to include the new item
    setItems([...items, newItem]);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item.name}, value: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenData;
