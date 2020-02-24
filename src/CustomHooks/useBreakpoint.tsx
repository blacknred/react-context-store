import * as React from "react";
import {
  portraitMedia,
  breakpointMedias,
  reversedBreakpoints
} from "../Constants/breakpoints";

const viewportCtx = React.createContext({});
// if (typeof window === 'undefined') {
//   global.window = {}
// }

const smMatch = window.matchMedia(breakpointMedias.sm);
const mdMatch = window.matchMedia(breakpointMedias.md);
const lgMatch = window.matchMedia(breakpointMedias.lg);
const portraitMatch = window.matchMedia(portraitMedia);

type Props = {
  children: any;
};

export const VieportProvider = (props: Props) => {
  const [isPortrait, setPortrait] = React.useState(false);
  const [breakpoint, setBreakpoint] = React.useState(reversedBreakpoints.lg);

  React.useEffect(() => {
    function onResize(q: any) {
      if (q.matches) {
        setBreakpoint(reversedBreakpoints[q.media]);
      }
    }

    function onFlip(q: any) {
      setPortrait(q.matches);
    }

    smMatch.addListener(onResize);
    mdMatch.addListener(onResize);
    lgMatch.addListener(onResize);
    portraitMatch.addListener(onFlip);
    onResize(smMatch);
    onResize(mdMatch);
    onResize(lgMatch);
    onFlip(portraitMatch);

    return () => {
      smMatch.removeListener(onResize);
      mdMatch.removeListener(onResize);
      lgMatch.removeListener(onResize);
      portraitMatch.removeListener(onFlip);
    };
  }, []);

  return (
    <viewportCtx.Provider value={{ breakpoint, isPortrait }}>
      {props.children}
    </viewportCtx.Provider>
  );
};

export default function useViewport() {
  const opts = React.useContext(viewportCtx);

  return opts;
}
