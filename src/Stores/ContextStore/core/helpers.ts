import { State, IOpts } from "./types";

export function persister(opts: IOpts, state: State, initial?: boolean) {
  if (!opts.persistance) {
    if (initial) return state;
    return;
  }

  try {
    if (typeof opts.persistance === "function") {
      if (initial) {
        const data = opts.persistance(opts.label!, state);
        if (!data) throw new Error("No data from custom persister!");
        return data;
      }

      opts.persistance(opts.label!, state);
    } else {
      if (initial) {
        const data = localStorage.getItem(opts.label!);
        if (!data) throw new Error("No data found in localStorage!");
        return JSON.parse(data, (key, value) => {
          if (key in state) return value;
        });
      }

      localStorage.setItem(opts.label!, JSON.stringify(state));
    }
  } catch (e) {
    console.group("Persistance action error");
    console.warn(e.message);
    console.groupEnd();

    if (initial) return state;
  }
}
