import * as React from "react";
import * as ReactDOM from "react-dom";
import { List1 } from "./List1";
import { List2 } from "./List2";
import { List3 } from "./List3";

const TOTAL_ITEM_COUNT = 2000;

const createInitialItems = () => {
  const initialItems = [];

  for (let i = 0; i < TOTAL_ITEM_COUNT; i++) {
    initialItems.push({
      id: i,
      name: `item ${i}`,
      selected: false
    });
  }
  return initialItems;
};

const App = () => {
  return (
    <>
      <p>Total items count: {TOTAL_ITEM_COUNT}</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "70%"
        }}
      >
        <List1 initialItems={createInitialItems()} />
        <List2 initialItems={createInitialItems()} />
        <List3 initialItems={createInitialItems()} />
      </div>
    </>
  );
};

ReactDOM.render(
  <App />,
  document.querySelector("#root"),
);
