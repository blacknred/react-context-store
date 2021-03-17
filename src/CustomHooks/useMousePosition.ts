import { useState, useEffect } from "react";

type Position = {
  x: number,
  y: number
}

export default function useMousePosition() {
  const [position, setPosition] = useState<Position>();

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return position;
}
