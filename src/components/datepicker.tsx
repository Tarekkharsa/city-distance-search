import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

export default function DatePickerComponent({
  label,
  name,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  errors,
  control,
  ...rest
}: any) {
  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-normal text-gray-700">
        {label}
      </label>

      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div className="relative ">
              <ReactDatePicker
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                selected={value}
                className={clsx(
                  readOnly
                    ? "bg-gray-100 focus:ring-0 cursor-not-allowed border-gray-300 focus:border-gray-300"
                    : errors[name]
                    ? "focus:ring-red-500 border-red-500 focus:border-red-500"
                    : "focus:ring-primary-500 border-gray-300 focus:border-primary-500",
                  "p-2 w-[60%] border border-gray-300 rounded-md  text-center"
                )}
                placeholderText={placeholder}
                aria-describedby={name}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                openToDate={value ?? defaultDate}
                dateFormat="dd/MM/yyyy"
                readOnly={readOnly}
                {...rest}
              />
              <div className="absolute text-lg text-gray-500 transform -translate-y-1/2 pointer-events-none right-4 top-1/2" />
            </div>
            <div className="mt-1">
              {helperText !== "" && (
                <p className="text-xs text-gray-500">{helperText}</p>
              )}
              {errors[name] && (
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => (
                    <p className="text-[10px] text-[#EF5A5A]">{message}</p>
                  )}
                />
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}
