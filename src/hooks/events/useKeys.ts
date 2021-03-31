import { useRef } from "react";
import useEvent from "./useEvent";

/** Hot Keys hook */
function useKeys(keys: string, handler: () => any, strict: boolean = false) {
  const tempKeys = useRef<string[]>([]);
  const allKeys = useRef<string[]>(
    keys.split(" ").map((key) => key.toLowerCase())
  );

  const downHandler = ({ key }: KeyboardEvent) => {
    key = key.toLowerCase();

    if (allKeys.current.includes(key)) {
      tempKeys.current.push(key);
    }
  };

  const upHandler = ({ key }: KeyboardEvent) => {
    key = key.toLowerCase();

    if (!allKeys.current.includes(key)) return;

    if (allKeys.current.length === 1) {
      tempKeys.current = [];
      handler();
    } else {
      const containsAll = allKeys.current.every((k, i) =>
        strict ? tempKeys.current[i] === k : tempKeys.current.includes(k)
      );

      const index = tempKeys.current.findIndex((sKey) => sKey === key);
      tempKeys.current = tempKeys.current.slice(0, index);

      if (containsAll) handler();
    }
  };

  useEvent("keydown", downHandler);
  useEvent("keyup", upHandler);
}

export default useKeys;

// Usage
// const onSingle = () => console.log("a");
// const onMulti = () => console.log("control shift x");
// const onMultiOrder = () => console.log("control shift x in order");

// useKeys("a", onSingle);
// useKeys("control shift x", onMulti);
// useKeys("control shift x", onMultiOrder, true);
