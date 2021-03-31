import { useState, useEffect, useCallback, useRef } from "react";

/** Function throttle hook */
function useThrottle(handler: (...args: any) => any, timeout: number = 300) {
  const [isReady, setIsReady] = useState<boolean>(true);
  const timer = useRef<any>();

  const throttled = useCallback(
    (...args) => {
      if (!isReady) return;

      setIsReady(false);
      handler(...args);
    },
    [isReady, handler]
  );

  useEffect(() => {
    if (!isReady) {
      timer.current = setTimeout(() => {
        setIsReady(true);
      }, timeout);

      return () => {
        clearTimeout(timer.current);
      };
    }
  }, [isReady, timeout]);

  return [throttled, isReady];
}

export default useThrottle;

// Usage
// const [number, setNumber] = useState(0);
// const addNumber = () => setNumber(number + 1);
// const [addNumberThrottled, isReady] = useThrottle(addNumber, 1000);
// return (
//   <>
//     <h1>Number: {number}</h1>
//     <button onClick={addNumber}>Add number</button>
//     <button onClick={addNumberThrottled}>Add number throttled</button>
//   </>
// );
