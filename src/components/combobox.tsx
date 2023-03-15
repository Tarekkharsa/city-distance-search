import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { useCombobox } from "downshift";
import * as React from "react";
import { UseFormReset } from "react-hook-form";
import { filterCities } from "../Api/api";
import { Spinner } from "./spinner";
import useSpinDelay from "spin-delay";

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
  function ComboBox() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [items, setItems] = React.useState<Array<[string, number, number]>>(
      []
    );

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
      toggleMenu,
    } = useCombobox({
      initialInputValue: value && value[0] ? value[0] : "",
      onSelectedItemChange: ({ selectedItem }) => {
        onChange(selectedItem);
      },
      onIsOpenChange() {
        filterCities().then((filteredCities) => {
          setItems(filteredCities);
          setLoading(false); // hide pending UI
        });
      },
      onInputValueChange({ inputValue }: any) {
        // setItems(cities.filter(getBooksFilter(inputValue)));
        setLoading(true); // show pending UI
        filterCities(inputValue).then((filteredCities) => {
          setItems(filteredCities);
          setLoading(false); // hide pending UI
        });
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
            <Spinner showSpinner={loading} combobox={true} />
            <input
              placeholder={placeholder ? placeholder : ""}
              className="w-full p-1.5 border border-gray-300 rounded-md pr-10"
              {...getInputProps({
                name: name,
                onClick: () => setLoading(true),
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
