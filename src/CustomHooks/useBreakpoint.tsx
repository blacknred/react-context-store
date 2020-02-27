import * as React from "react";
import { useContext, createContext, useEffect, useState } from "react";
import {
  portraitMedia,
  breakpointMedias,
  reversedBreakpoints
} from "../Constants/breakpoints";

const breakpointCtx = createContext({});

declare const global: any;
if (typeof window === "undefined") {
  global.window = {};
}

const smMatch = window.matchMedia(breakpointMedias.sm);
const mdMatch = window.matchMedia(breakpointMedias.md);
const lgMatch = window.matchMedia(breakpointMedias.lg);
const portraitMatch = window.matchMedia(portraitMedia);

type Props = {
  children: any;
};

const BreakpointProvider = (props: Props) => {
  const [isPortrait, setPortrait] = useState(false);
  const [breakpoint, setBreakpoint] = useState(reversedBreakpoints.lg);

  useEffect(() => {
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

function useBreakpoint() {
  const opts = useContext(breakpointCtx);

  return opts;
}

function withBreakpointProvider(WrappedComponent: any) {
  return function(props: any) {
    return (
      <BreakpointProvider>
        <WrappedComponent {...props} />
      </BreakpointProvider>
    );
  };
}

export { BreakpointProvider, withBreakpointProvider };
export default useBreakpoint;
