import { useState, useRef, useEffect } from "react";

type Size = {
  width: number,
  height: number
}

export default function useSize(trigger: any) {
  const ref: any = useRef<any>();
  const [rect, setRect] = useState<Size>();

  useEffect(() => {
    const size = ref.current.getBoundingClientRect();

    setRect(size);
  }, [trigger, setRect]);

  return [rect, ref];
}
