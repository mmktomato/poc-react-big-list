import * as React from "react";

const List5ValueContext = React.createContext({
  clickedItems: []
});

const List5HandlerContext = React.createContext({
  addClickedItem: () => {},
});

export const List5ContextProvider = ({ children }) => {
  const [clickedItems, setClickedItems] = React.useState([]);

  const addClickedItem = React.useCallback(id => {
    setClickedItems(prev => prev.concat([id]));
  }, []);

  const valueState = React.useMemo(() => ({ clickedItems }), [clickedItems]);
  const handlerState = React.useMemo(() => ({ addClickedItem }), []);

  return (
    <List5ValueContext.Provider value={valueState}>
      <List5HandlerContext.Provider value={handlerState}>
        {children}
      </List5HandlerContext.Provider>
    </List5ValueContext.Provider>
  );
};

const useList5 = initialItems => {
  const [items, setItems] = React.useState(initialItems);

  const setSelected = React.useCallback((id, selected) => {
    const updateItems = prevItems => prevItems.map(item => item.id === id ? { ...item, selected } : item);
    setItems(updateItems);

    // NOTE: Don't refer `items` directly like below if you use `useCallback`.
    //       It causes "Selected items count" doesn't increase.
    //       Because this arrow function captures initial `items` in the scope.
    // const _items = items.map(item => item.id === id ? { ...item, selected } : item);
    // setItems(_items);
  }, []);

  return [items, setSelected];
};

export const List5 = ({ initialItems }) => {
  const [items, setSelected] = useList5(initialItems);
  const { clickedItems } = React.useContext(List5ValueContext);

  return (
    <div style={{ margin: "0 50px" }}>
      <p>List5 (Separated context)</p>
      <div>Selected items count: {items.filter(item => item.selected).length}</div>
      <div>Clicked items count: {clickedItems.length}</div>
      <ul
        style={{
          height: "400px",
          overflowY: "scroll"
        }}
      >
        {items.map(item => (
          <ListItem5
            key={item.id}
            item={item}
            onSelected={setSelected}
          />
        ))}
      </ul>
    </div>
  );
}

const ListItem5 = React.memo(({ item, onSelected }) => {
  console.log("render ListItem5");

  const { addClickedItem } = React.useContext(List5HandlerContext);

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
