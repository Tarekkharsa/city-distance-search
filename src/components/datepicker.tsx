import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function DatepickerComponent() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <Datepicker
      primaryColor={"fuchsia"}
      useRange={false}
      value={value}
      onChange={handleValueChange}
    />
  );
}
