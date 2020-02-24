import { useState } from "react";

export default function useForm(defaultState: any) {
  const [fields, setField] = useState(defaultState);

  return [
    fields,
    (e: any) => {
      setField(e.target.value);
    }
  ];
}
