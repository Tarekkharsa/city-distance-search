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
            <div className="relative mt-1">
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
                  "block w-full  shadow-sm border border-gray-300 rounded-md"
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
                <span className="text-sm text-red-500">
                  {errors[name].message}
                </span>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}
