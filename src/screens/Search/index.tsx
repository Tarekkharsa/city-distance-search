import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import queryString from "query-string";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ComboBoxExample from "../../components/combobox";
import DatePickerComponent from "../../components/datepicker";
import NumberInput from "../../components/NumberInput";

const citySchema = z.object({
  city_origin: z.array(z.union([z.string(), z.number(), z.number()])).nonempty({
    message: "You must choose the city of origin",
  }),
  city_destinations: z.array(
    z.object({
      name: z.array(z.union([z.string(), z.number(), z.number()])),
    })
  ),
  passengers: z.number().min(1).max(10),
  date: z.date(),
});

// Infer the TS type according to the zod schema.
type CityType = z.infer<typeof citySchema>;

export default function Search() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    clearErrors,
    resetField,
    trigger,
    getValues,
    setError,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<CityType>({
    mode: "onChange",
    resolver: zodResolver(citySchema), // Configuration the validation with the zod schema.
    defaultValues: {
      city_origin: [],
      city_destinations: [{ name: [] }],
      passengers: 1,
      date: undefined,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "city_destinations",
    control,
  });

  const onSubmit = (data: CityType) => {
    const destinations = data.city_destinations.map((city) => city.name);
    const query = queryString.stringifyUrl({
      url: "/result",
      query: {
        date: format(data.date, "dd/MM/yyyy"),
        passengers: data.passengers,
        city_origin: data.city_origin,
        city_destinations: queryString.stringify(destinations, {
          arrayFormat: "index",
        }),
      },
    });

    navigate(`${query}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center gap-8">
        <div>
          <Controller
            control={control}
            name="city_origin"
            render={({ field: { onChange, value, name } }) => (
              <ComboBoxExample
                label="City of origin"
                onChange={onChange}
                value={value}
                name={"city_origin"}
                errors={errors}
                handleReset={() => {
                  reset((formValues: any) => ({
                    ...formValues,
                    [name]: [],
                  }));
                }}
              />
            )}
          />

          {fields.map(({ id, name }, index) => {
            return (
              <div
                className={" flex justify-between items-center relative "}
                key={id}
              >
                <Controller
                  key={id}
                  control={control}
                  name={`city_destinations.${index}.name`}
                  defaultValue={name}
                  render={({ field: { onChange, value, name } }) => (
                    <ComboBoxExample
                      label="City of destination"
                      onChange={onChange}
                      value={value}
                      name={`city_destinations.${index}.name`}
                      errors={errors}
                      handleReset={() => {
                        resetField(`city_destinations.${index}.name`);
                      }}
                    />
                  )}
                />
                {index > 0 && (
                  <button
                    className="text-indigo-600 absolute -right-6 top-[36px]"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}

          <div className="flex flex-col items-start pt-2">
            <button
              className="underline text-xs sm:text-sm font-medium text-indigo-600"
              type="button"
              onClick={() => append([{ name: [] }])}
            >
              Add destination
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[50%] ml-2 ">
          <NumberInput
            lable={"Passengers"}
            name={"passengers"}
            control={control}
            errors={errors}
          />
          <DatePickerComponent
            errors={errors}
            control={control}
            name={"date"}
            label="Date"
            defaultYear="2001"
          />
          <div className="pt-4"></div>
        </div>
      </div>
      <div className="flex mt-2  justify-center">
        <input
          className="p-2 cursor-pointer bg-gray-800 text-white flex items-center justify-center border border-gray-300 rounded"
          type="submit"
        />
      </div>
    </form>
  );
}
