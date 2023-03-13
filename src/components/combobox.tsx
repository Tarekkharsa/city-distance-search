import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { useCombobox } from "downshift";
import * as React from "react";
import { UseFormReset } from "react-hook-form";

const cities: Array<[string, number, number]> = [
  ["Paris", 48.856614, 2.352222],

  ["Marseille", 43.296482, 5.36978],

  ["Lyon", 45.764043, 4.835659],

  ["Toulouse", 43.604652, 1.444209],

  ["Nice", 43.710173, 7.261953],

  ["Nantes", 47.218371, -1.553621],

  ["Strasbourg", 48.573405, 7.752111],

  ["Montpellier", 43.610769, 3.876716],

  ["Bordeaux", 44.837789, -0.57918],

  ["Lille", 50.62925, 3.057256],

  ["Rennes", 48.117266, -1.677793],

  ["Reims", 49.258329, 4.031696],

  ["Le Havre", 49.49437, 0.107929],

  ["Saint-Étienne", 45.439695, 4.387178],

  ["Toulon", 43.124228, 5.928],

  ["Angers", 47.478419, -0.563166],

  ["Grenoble", 45.188529, 5.724524],

  ["Dijon", 47.322047, 5.04148],

  ["Nîmes", 43.836699, 4.360054],

  ["Aix-en-Provence", 43.529742, 5.447427],
];
export default function ComboBoxExample({
  label,
  placeholder,
  onChange,
  value,
  name,
  errors,
  handleReset,
}: {
  label: string;
  placeholder?: string;
  onChange: (value: [string, number, number] | null | undefined) => void;
  value: any;
  name: string;
  errors: any;
  handleReset: any;
}) {
  function getBooksFilter(inputValue: string) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return function booksFilter(book: [string, number, number]) {
      return (
        !inputValue || book[0].toLowerCase().includes(lowerCasedInputValue)
      );
    };
  }
  function ComboBox() {
    const [items, setItems] = React.useState(cities);
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
      selectItem,
    } = useCombobox({
      initialInputValue: value && value[0] ? value[0] : "",
      onSelectedItemChange: ({ selectedItem }) => {
        onChange(selectedItem);
      },
      onInputValueChange({ inputValue }: any) {
        setItems(cities.filter(getBooksFilter(inputValue)));
      },
      items,
      itemToString(item) {
        return item ? item[0] : "";
      },
    });

    return (
      <div>
        <div className="w-72 flex flex-col gap-1">
          <label className="w-fit" {...getLabelProps()}>
            {label}
          </label>
          <div className="relative">
            <input
              placeholder={placeholder ? placeholder : ""}
              className="w-full p-1.5 border border-gray-300 rounded-md pr-10"
              {...getInputProps({
                name: name,
              })}
            />
            {value && value?.length > 0 && (
              <button
                aria-label="clear selection"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                type="button"
                onClick={() => {
                  handleReset();
                }}
                tabIndex={-1}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13L13 1M1 1L13 13"
                    stroke="#7786D2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-[10px] text-[#EF5A5A]">{message}</p>
            )}
          />
        </div>
        <ul
          className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && "hidden"
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={clsx(
                  highlightedIndex === index && "bg-blue-300",
                  selectedItem === item && "font-bold",
                  "py-2 px-3 shadow-sm flex flex-col"
                )}
                key={`${item[0]}${index}`}
                {...getItemProps({ item, index })}
              >
                <span className="text-sm text-gray-700">{item[0]}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return <ComboBox />;
}
