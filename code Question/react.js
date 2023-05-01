const { Fragment, useState, useMemo } = React;

const List = ({ items, onSelect }) => {
  // Create a memoized array of selected item names
  const selectedNames = useMemo(() => {
    return items.filter((item) => item.selected).map((item) => item.name);
  }, [items]);

  return (
    <Fragment>
      <div>
        {selectedNames.length > 0 && (
          <p>
            Selected items: {selectedNames.join(", ")}
          </p>
        )}
      </div>
      <ul className="List">
        {items.map((item) => (
          <ListItem
            key={item.name}
            item={item}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </Fragment>
  );
};

const ListItem = React.memo(({ item, onSelect }) => {
  const handleSelect = () => {
    onSelect(item.name);
  };

  return (
    <li
      className={`List__item List__item--${item.color} ${
        item.selected ? "List__item--selected" : ""
      }`}
      onClick={handleSelect}
    >
      {item.name}
    </li>
  );
});

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ["tiny", "small", "medium", "large", "huge"];
const colors = [
  "navy",
  "blue",
  "aqua",
  "teal",
  "olive",
  "green",
  "lime",
  "yellow",
  "orange",
  "red",
  "maroon",
  "fuchsia",
  "purple",
  "silver",
  "gray",
  "black",
];
const fruits = [
  "apple",
  "banana",
  "watermelon",
  "orange",
  "peach",
  "tangerine",
  "pear",
  "kiwi",
  "mango",
  "pineapple",
];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.map((color) => ({
          name: `${size} ${color} ${fruit}`,
          color,
          selected: false,
        })),
      ],
      []
    ),
  ],
  []
);

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (itemName) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemName)) {
        // If the item is already selected, unselect it
        return prevSelectedItems.filter((name) => name !== itemName);
      } else {
        // If the item is not selected, add it to the selected items
        return [...prevSelectedItems, itemName];
      }
    });
  };

  // Memoize the items with the updated selection status
  const memoizedItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      selected: selectedItems.includes(item.name),
    }));
  }, [items, selectedItems]);

  return (
    <div>
      <h1>List of Items</h1>
      <List items={memoizedItems} onSelect={handleSelect} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

