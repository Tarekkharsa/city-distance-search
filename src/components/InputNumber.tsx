import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { Controller } from "react-hook-form";

type NumberInputProps = {
  name: string;
  lable: string;
  control: any;
  errors: any;
};

const NumberInput: React.FC<NumberInputProps> = ({
  name,
  control,
  lable,
  errors,
}) => {
  const handlePlus = (value: number, setValue: any) => {
    setValue(value + 1);
  };

  const handleMinus = (value: number, setValue: any) => {
    setValue(value - 1);
  };

  return (
    <div className="relative">
      <label
        htmlFor="custom-input-number"
        className="w-full text-gray-600 text-sm font-semibold"
      >
        {lable}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={0}
        render={({ field: { onChange, value } }) => (
          <div className="flex justify-center items-center relative w-[60%]">
            <button
              type="button"
              className="w-6 absolute right-1  bg-blue-200
              text-white rounded-md hover:bg-[#7786D2] "
              onClick={() => handlePlus(value, onChange)}
            >
              +
            </button>
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="p-2 w-full border border-gray-300 rounded-md  text-center"
            />
            <button
              type="button"
              className="w-6 absolute left-1  bg-blue-200
              text-white rounded-md hover:bg-[#7786D2] "
              onClick={() => handleMinus(value, onChange)}
            >
              -
            </button>
          </div>
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-[10px] text-[#EF5A5A]">{message}</p>
        )}
      />
    </div>
  );
};

export default NumberInput;
