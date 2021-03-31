import { useRef, useEffect, useCallback, SyntheticEvent } from "react";
// http://demo.nimius.net/debounce_throttle/

export function debounce(func: Function, wait: number, immediate: boolean = true) {
  let timeout: any = undefined;

  return function executedFunction(...args: any[]) {
    const context: any = this;

    // eslint-disable-next-line func-names
    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

/** Function debounce hook */
function useDebounce(callback: () => any, wait: number, options?: object) {
  function createDebouncedCallback(fn: Function): Function {
    return debounce(fn, wait, options);
  }

  const callbackRef = useRef<Function>(callback);
  const debouncedCallbackRef = useRef<Function>(
    createDebouncedCallback(callback)
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    debouncedCallbackRef.current = createDebouncedCallback((...args) => {
      callbackRef.current(...args);
    });
  }, [wait, options]);  
  
  return debouncedCallbackRef.current;
}

export default useDebounce;