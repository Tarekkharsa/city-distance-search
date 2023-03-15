import { ErrorMessage } from "@hookform/error-message";

export default function InputNumber({
  name,
  lable,
  register,
  errors,
}: {
  name: string;
  lable: string;
  register: any;
  errors: any;
}) {
  return (
    <div className="custom-number-input h-10 w-32 mb-8">
      <label
        htmlFor="custom-input-number"
        className="w-full text-gray-600 text-sm font-semibold"
      >
        {lable}
      </label>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          className="  text-gray-600 hover:text-gray-600 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          name={name}
          className="border border-gray-300 rounded-md focus:outline-none text-center w-full  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-600  "
          {...register(name, { valueAsNumber: true })}
        />
        <button
          data-action="increment"
          className=" text-gray-600 hover:text-gray-600 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-[10px] text-[#EF5A5A]">{message}</p>
        )}
      />
    </div>
  );
}
