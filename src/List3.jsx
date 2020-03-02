import * as React from "react";

const useList3 = initialItems => {
  const [items, setItems] = React.useState(initialItems);

  const setSelected = React.useCallback((id, selected) => {
    const updateItems = prevItems => prevItems.map(item => item.id === id ? { ...item, selected } : item);
    setItems(updateItems);
  }, []);

  return [items, setSelected];
};

export const List3 = ({ initialItems }) => {
  const [items, setSelected] = useList3(initialItems);

  return (
    <div style={{ margin: "0 50px" }}>
      <p>List3 (React.memo)</p>
      <div>Selected items count: {items.filter(item => item.selected).length}</div>
      <ul
        style={{
          height: "400px",
          overflowY: "scroll"
        }}
      >
        {items.map(item => (
          <ListItem3
            key={item.id}
            item={item}
            onSelected={setSelected}
          />
        ))}
      </ul>
    </div>
  );
}

const ListItem3 = React.memo(({ item, onSelected }) => {
  console.log("render ListItem3");

  return (
    <li>
      <input type="checkbox" onChange={e => onSelected(item.id, e.currentTarget.checked)} />
      <span>{item.name}</span>
    </li>
  );

// NOTE: You don't need to pass the second argument to `React.memo`.
//       This is because each props (`item` and `onSelected`) is the same before and after
//       updating the state of parent component. In this case, each props is compared shallowly.
//
//       For example, if you don't use `React.useCallback` in `useList3`, you should pass
//       the second argument like below in order to let React skip meaningless reconciliation.
//}, (prev, next) => (prev.item.selected === next.item.selected));
});
