import { FC, Props, useContext, createContext, useEffect, useState } from "react";

declare const global: any;
if (typeof window === "undefined") {
  global.window = {};
}

export enum Media {
  sm = "(max-width: 600px)",
  md = "(max-width: 1200px) and (min-width: 601px)",
  lg = "(min-width: 1201px)",
  portrait = "(orientation: portrait)"
};

export type BreakpointCtx = {
  breakpoint: keyof typeof Media,
  isPortrait: boolean
}

const breakpointCtx = createContext<BreakpointCtx>({} as BreakpointCtx);

const BreakpointProvider: FC = ({ children }) => {
  const [isPortrait, setPortrait] = useState<boolean>(false);
  const [breakpoint, setBreakpoint] = useState<keyof typeof Media>('lg');

  useEffect(() => {
    const smMatch = window.matchMedia(Media.sm);
    const mdMatch = window.matchMedia(Media.md);
    const lgMatch = window.matchMedia(Media.lg);
    const portraitMatch = window.matchMedia(Media.portrait);

    function onResize(ev: MediaQueryListEvent) {
      if (ev.matches) {
        const r: keyof typeof Media = Media[ev.media];
        setBreakpoint(r);
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
      {children}
    </breakpointCtx.Provider>
  );
};

function useBreakpoint() {
  return useContext(breakpointCtx);
}

function withBreakpointProvider(WrappedComponent: FC) {
  return function (props: Props<any>) {
    return (
      <BreakpointProvider>
        <WrappedComponent {...props} />
      </BreakpointProvider>
    );
  };
}

export { BreakpointProvider, withBreakpointProvider };

export default useBreakpoint;
