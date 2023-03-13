import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import ComboBoxExample from "../../components/combobox";
import "./index.css";
import DatepickerComponent from "../../components/datepicker";

const testsSchema = z.array(
  z.object({
    name: z.array(z.union([z.string(), z.number(), z.number()])),
  })
);
const cityItemSchema = z
  .array(z.union([z.string(), z.number(), z.number()]))
  .nonempty({
    message: "You must choose the city of origin",
  });
const citySchema = z.object({
  city_origin: cityItemSchema,
  // city_destination: cityItemSchema,
  tests: testsSchema,
});

// Infer the TS type according to the zod schema.
type CityType = z.infer<typeof citySchema>;
type CityItemType = z.infer<typeof cityItemSchema>;

export default function Search() {
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
      // city_destination: [],
      tests: [{ name: [] }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "tests",
    control,
  });
  const onSubmit = (city: CityType) => {
    console.log("dans onSubmit", city);
    reset();
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
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
                <div className={" flex justify-between items-center "} key={id}>
                  <Controller
                    key={id}
                    control={control}
                    name={`tests.${index}.name`}
                    defaultValue={name}
                    render={({ field: { onChange, value, name } }) => (
                      <ComboBoxExample
                        label="City of destination"
                        onChange={onChange}
                        value={value}
                        name={`tests.${index}.name`}
                        errors={errors}
                        handleReset={() => {
                          resetField(`tests.${index}.name`);
                        }}
                      />
                    )}
                  />
                  {index > 0 && (
                    <button
                      className="text-indigo-600"
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
          <div className="flex flex-col ">
            <DatepickerComponent />
          </div>
        </div>
        <div className="flex mt-2  justify-center">
          <input
            className="p-2 cursor-pointer bg-gray-800 text-white flex items-center justify-center border border-gray-300 rounded"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
