import { useRef, useEffect, useLayoutEffect } from "react";
import { State, IOpts } from "./types";

export function useMiddleware(state: State, opts?: IOpts) {
  const snapshot = useRef<State>();

  useLayoutEffect(() => {
    if (opts?.storage) {
      console.log("try to load state from localStorage");
    }
  }, [opts]);

  useEffect(() => {
    if (!snapshot.current) {
      snapshot.current = state;
      return;
    }

    const time = new Date().toLocaleTimeString();
    const label = `[${opts?.label || "_STORE_"} @ ${time}]`;

    if (opts?.logger) {
      if (typeof opts.logger === "function") {
        opts.logger(state, snapshot.current);
      } else {
        if (opts?.extendLogger) console.group(label);
        else console.groupCollapsed(label);
        console.log("prev:", snapshot.current);
        console.log("next:", state);
        console.groupEnd();
      }
    }

    if (opts?.storage) {
      if (typeof opts.storage === "function") {
        opts.storage(state, label);
      } else {
        window.localStorage.setItem(label, JSON.stringify(state));
      }
    }

    snapshot.current = state;
  }, [opts, state]);
}
