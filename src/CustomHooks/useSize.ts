import { useState, useRef, useLayoutEffect } from "react";

export default function useSize(trigger: any) {
  const ref: any = useRef();
  const [rect, setRect] = useState({});

  useLayoutEffect(() => {
    const size = ref.current.getBoundingClientRect();

    setRect(size);
  }, [trigger, ref, setRect]);

  return [rect, ref];
}
