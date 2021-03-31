import { useState, useEffect, ChangeEvent } from "react";

interface Options {
  validate?: (newValue: any, currentValue: any) => boolean;
}

/** Input hook */
function useInput(initialValue: any = "", opts: Options = {}) {
  const [value, setValue] = useState(initialValue);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    let shouldUpdate = true;

    if (typeof opts.validate === "function") {
      shouldUpdate = opts.validate(newValue, value);
    }

    if (shouldUpdate) setValue(newValue);
  }

  // update default value
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, onChange };
}

export default useInput;

// Usage
// const input = useInput("hello", {
//   validate: (newValue) => newValue.length < 15
// });
// return (
//   <div>
//     <p> Max length 15 </p>
//     <input {...input} />
//     <p>
//       Value is <b>{input.value}</b>
//     </p>
//   </div>
// );
