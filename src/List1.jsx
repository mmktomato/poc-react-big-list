import * as React from "react";

const useList1 = initialItems => {
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

export const List1 = ({ initialItems }) => {
  const [items, setSelected] = useList1(initialItems);

  return (
    <div style={{ margin: "0 50px" }}>
      <p>List1</p>
      <div>Selected items count: {items.filter(item => item.selected).length}</div>
      <ul
        style={{
          height: "400px",
          overflowY: "scroll"
        }}
      >
        {items.map(item => (
          <ListItem1
            key={item.id}
            item={item}
            onSelected={setSelected}
          />
        ))}
      </ul>
    </div>
  );
}

const ListItem1 = ({ item, onSelected }) => {
  console.log("render ListItem1");

  return (
    <li>
      <input type="checkbox" onChange={e => onSelected(item.id, e.currentTarget.checked)} />
      <span>{item.name}</span>
    </li>
  );
};
