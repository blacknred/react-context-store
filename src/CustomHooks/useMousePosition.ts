import { useState, useEffect } from "react";

export default function useMousePosition() {
  const [position, setPosition] = useState({});

  useEffect(() => {
    function onMouseMove(e: any) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return position;
}
