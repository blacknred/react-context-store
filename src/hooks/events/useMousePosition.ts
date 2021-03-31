import { RefObject, useState } from "react";
import useEvent from "./useEvent";

type Position = {
  x: number;
  y: number;
};

/** Mouse position hook */
function useMousePosition(ref?: RefObject<HTMLElement>) {
  const [position, setPosition] = useState<Position>();

  useEvent(
    "mousemove",
    (event: any) => {
      setPosition({ x: event.clientX, y: event.clientY });
    },
    ref
  );

  return position;
}

export default useMousePosition;
