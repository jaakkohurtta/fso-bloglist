import { useState } from "react";

export const useField = (type, placeholder) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    props: {
      type,
      placeholder,
      value,
      onChange,
    },
    reset,
  };
};
