import { useRef, useEffect, RefObject } from "react";

/** Event binding hook */
function useEvent(
  eventName: string,
  handler: (args: any) => any,
  ref?: RefObject<HTMLElement>
) {
  // cache handler to prevent empty bindings & updates
  const savedHandler = useRef<any>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Create event listener that calls handler function stored in ref
      const eventListener = (event: any) => savedHandler.current(event);

      if (ref?.current?.addEventListener) {
        ref.current.addEventListener(eventName, eventListener);
      } else {
        window.addEventListener(eventName, eventListener);
      }

      return () => {
        if (ref?.current?.addEventListener) {
          ref.current.removeEventListener(eventName, eventListener);
        } else {
          window.removeEventListener(eventName, eventListener);
        }
      };
    },
    [eventName, ref]
  );
}

export default useEvent;

// Usage
// const [coords, setCoords] = useState({ x: 0, y: 0 });

// const handler = useCallback(({ clientX, clientY }) => {
//   setCoords({ x: clientX, y: clientY });
// }, [setCoords]);

// useEventListener("mousemove", handler);
