import * as React from "react";
import {
  portraitMedia,
  breakpointMedias,
  reversedBreakpoints
} from "../Constants/breakpoints";

const breakpointCtx = React.createContext({});
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

export const BreakpointProvider = (props: Props) => {
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
    <breakpointCtx.Provider value={{ breakpoint, isPortrait }}>
      {props.children}
    </breakpointCtx.Provider>
  );
};

export default function useBreakpoint() {
  const opts = React.useContext(breakpointCtx);

  return opts;
}

export function withBreakpointProvider(WrappedComponent: any) {
  return function(props: any) {
    return (
      <BreakpointProvider>
        <WrappedComponent {...props} />
      </BreakpointProvider>
    );
  };
}
