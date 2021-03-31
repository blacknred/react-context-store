import { RefObject, useCallback, useState } from "react";
import useEvent from "./useEvent";

/** Detects clicks outside of a modal|dropdown|tooltip to close it */
function useClickOutside(handler: (a: MouseEvent | TouchEvent) => any) {
  const [node, setNode] = useState<HTMLElement>();

  const ref = useCallback(
    (node: HTMLElement) => {
      setNode(node);
    },
    [setNode]
  );

  const eventHandler = (ev: MouseEvent | TouchEvent) => {
    // Do nothing if clicking ref's element or descendent elements
    // @ts-ignore
    if (!node || node.contains(ev.target)) return;
    handler(ev);
  };

  useEvent("mousedown", eventHandler);
  useEvent("touchstart", eventHandler);

  return ref;
}

export default useClickOutside;

// usage
// const [isModalOpen, setModalOpen] = useState(false);
// const myRef = useClickOutside(() => setModalOpen(false));
// <div>{isModalOpen
//   ? <div ref={myRef}>Click outside of me to close.</div>
//   : <button onClick={() => setModalOpen(true)}>Open Modal</button>}
// </div>

// extended version https://github.com/thebuilder/react-intersection-observer
