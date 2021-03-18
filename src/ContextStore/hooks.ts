import { useRef, useEffect } from "react";
import { State, IOpts } from "./types";
import { persister } from "./helpers";

export function useMiddleware(state: State, opts: IOpts) {
  const snapshot = useRef<State>();

  useEffect(() => {
    if (!snapshot.current) {
      snapshot.current = state;
      return;
    }

    const timeLabel = `[${opts.label} @ ${new Date().toLocaleTimeString()}]`;

    if (opts.logger) {
      if (typeof opts.logger === "function") {
        opts.logger(state, snapshot.current);
      } else {
        if (opts.extendLogger) console.group(timeLabel);
        else console.groupCollapsed(timeLabel);
        console.log("prev:", snapshot.current);
        console.log("next:", state);
        console.groupEnd();
      }
    }

    if (opts.persistance) persister(opts, state);

    snapshot.current = state;
  }, [opts, state]);
}
