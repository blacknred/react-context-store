import { useRef } from "react";

/** Increment count of renders */
const useUpdateCounter = (label?: string | number) => {
  const ref = useRef(0);
  ref.current += 1;

  return `${ref.current} ${label || ""}`;
};

export default useUpdateCounter;
