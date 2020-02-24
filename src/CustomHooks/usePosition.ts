import { useState, useEffect } from "react";

export default function usePosition() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    function onMouseMove(e: any) {
      setPosition(e.clientX);
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return position;
}
