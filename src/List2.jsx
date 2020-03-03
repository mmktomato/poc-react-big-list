import * as React from "react";
import { FixedSizeList } from "react-window";

const useList2 = initialItems => {
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

export const List2 = ({ initialItems }) => {
  const [items, setSelected] = useList2(initialItems);

  // NOTE: The `FixedSizeList` from `react-window` removes components that are not displayed on the screen.
  //       Note that you can't find the element by "Ctrl-F" search.
  return (
    <div style={{ margin: "0 50px" }}>
      <p>{"List2 (react-window)"}</p>
      <div>Selected items count: {items.filter(item => item.selected).length}</div>
      <FixedSizeList
        height={400}
        width="100%"
        itemCount={initialItems.length}
        itemSize={24}
        itemData={{
          items,
          onSelected: setSelected
        }}
        innerElementType="ul"
      >
        {ListItem2}
      </FixedSizeList>
    </div>
  );
}

const ListItem2 = ({ index, style, data }) => {
  console.log("render ListItem2");

  const item = data.items[index];
  if (!item) {
    return null;
  }

  return (
    <li style={style}>
      <input type="checkbox" onChange={e => data.onSelected(item.id, e.currentTarget.checked)} />
      <span>{item.name}</span>
    </li>
  );
};
