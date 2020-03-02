import * as React from "react";
import * as ReactDOM from "react-dom";
import { List1 } from "./List1";
import { List2 } from "./List2";
import { List3 } from "./List3";
import { List4, List4ContextProvider } from "./List4";
import { List5, List5ContextProvider } from "./List5";

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

const ListContainer = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      margin: "0 50px"
    }}
  >
    {children}
  </div>
);

const App = () => {
  return (
    <>
      <p>Total items count: {TOTAL_ITEM_COUNT}</p>
      <ListContainer>
        <List1 initialItems={createInitialItems()} />
        <List2 initialItems={createInitialItems()} />
        <List3 initialItems={createInitialItems()} />
      </ListContainer>

      <hr />

      <ListContainer>
        <List4ContextProvider>
          <List4 initialItems={createInitialItems()} />
        </List4ContextProvider>

        <List5ContextProvider>
          <List5 initialItems={createInitialItems()} />
        </List5ContextProvider>
      </ListContainer>
    </>
  );
};

ReactDOM.render(
  <App />,
  document.querySelector("#root"),
);
