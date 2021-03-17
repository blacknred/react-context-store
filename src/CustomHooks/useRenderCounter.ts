import { useRef } from "react";

const useRendersCounter = (label?: string | number) => {
  const ref = useRef(0);
  ref.current += 1;

  return `${ref.current} ${label || ""}`;
};

export default useRendersCounter;
