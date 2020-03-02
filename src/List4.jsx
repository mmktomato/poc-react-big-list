import * as React from "react";

const List4Context = React.createContext({
  clickedItems: [],
  addClickedItem: () => {},
});

export const List4ContextProvider = ({ children }) => {
  const [clickedItems, setClickedItems] = React.useState([]);

  const addClickedItem = React.useCallback(id => {
    setClickedItems(prev => prev.concat([id]));
  }, []);

  const state = React.useMemo(() => ({
    clickedItems, addClickedItem,
  }), [clickedItems]);

  return (
    <List4Context.Provider value={state}>
      {children}
    </List4Context.Provider>
  );
};

const useList4 = initialItems => {
  const [items, setItems] = React.useState(initialItems);

  const setSelected = React.useCallback((id, selected) => {
    const updateItems = prevItems => prevItems.map(item => item.id === id ? { ...item, selected } : item);
    setItems(updateItems);
  }, []);

  return [items, setSelected];
};

export const List4 = ({ initialItems }) => {
  const [items, setSelected] = useList4(initialItems);
  const { clickedItems } = React.useContext(List4Context);

  return (
    <div style={{ margin: "0 50px" }}>
      <p>List4 (Single context)</p>
      <div>Selected items count: {items.filter(item => item.selected).length}</div>
      <div>Clicked items count: {clickedItems.length}</div>
      <ul
        style={{
          height: "400px",
          overflowY: "scroll"
        }}
      >
        {items.map(item => (
          <ListItem4
            key={item.id}
            item={item}
            onSelected={setSelected}
          />
        ))}
      </ul>
    </div>
  );
}

const ListItem4 = React.memo(({ item, onSelected }) => {
  console.log("render ListItem4");

  const { addClickedItem } = React.useContext(List4Context);

  return (
    <li>
      <input type="checkbox" onChange={(e) => onSelected(item.id, e.currentTarget.checked)} />
      <span
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline"
        }}
        onClick={() => addClickedItem(item.id)}
      >
        {item.name}
      </span>
    </li>
  );
});
