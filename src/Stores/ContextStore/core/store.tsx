import React, {
  FC,
  Props,
  Context,
  useMemo,
  useState,
  useContext,
  useReducer,
  ReactElement,
  createContext,
} from "react";
import { persister } from "./helpers";
import { useMiddleware } from './hooks';
import { State, Reducer, MapContext, SelectorMap, ContextMap, IOpts } from './types';

export const createContextConnector = (Ctx: Context<any>) => (
  Component: FC<any>,
  selectors?: SelectorMap
) => (props: Props<any>): ReactElement => {
  const { state, dispatch } = useContext(Ctx);

  if (!selectors) return <Component {...props} {...state} />;

  const ctxProps = Object.keys(selectors).reduce(
    (acc: any, key: string): any => {
      acc[key] = selectors[key](state, dispatch);
      return acc;
    },
    {}
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  return useMemo((): ReactElement => <Component {...props} {...ctxProps} />, [
    ...Object.values(props),
    ...Object.values(ctxProps).filter((p) => typeof p !== "function")
  ]);
  /* eslint-enable react-hooks/exhaustive-deps */
};

export const createSubContextSelector = (CtxMap: ContextMap) => (
  selector: (CtxMap: ContextMap) => Context<any>
) => (selector(CtxMap) ? useContext(selector(CtxMap)) : {});

/** Single context store */

export function createStore(initialState: State, reducer?: Reducer, opts?: IOpts) {
  if (opts) {
    if (!opts.label) opts.label = "_STORE_";
    initialState = persister(opts, initialState, true);
  }

  const _Store = createContext(initialState);
  const connect = createContextConnector(_Store);

  // const state = Object.keys(reds).reduce(
  //   (acc, key) => ({ ...acc, [key]: reds[key][0] }),
  //   {}
  // );

  // const dispatch = (action: Action) =>
  //   Object.keys(reds)
  //     .map((key) => reds[key][1])
  //     .forEach((fn) => fn(action));

  const Provider: FC = ({ children }) => {
    const [state1, dispatch1] = useReducer(reducer as Reducer, initialState);
    const [state2, setState] = useState(initialState);

    if (opts) useMiddleware(reducer ? state1 : state2, opts);

    const dispatch2 = (a: any, b?: any) => {
      if (typeof a === "object" && a !== null) {
        setState({ ...state2, ...a });
      } else if (typeof a === "string" && !!b) {
        setState({ ...state2, [a]: b });
      }
    };

    return (
      <_Store.Provider
        value={{
          state: reducer ? state1 : state2,
          dispatch: reducer ? dispatch1 : dispatch2
        }}>
        {children}
      </_Store.Provider>
    );
  };

  return { Provider, connect };
}

/** Context map store
 * 1. Here we use subcontexts which represent reducers with related data.
 * Any updates within subcontext stay there.
 * 2. Also we use main context which wont be update and his way store will
 * not trigger updates at all. Nevertheless subcontexts stay reactive and
 * are changed within FC without rerenders
 * 3. The main issue is how to share subcontext for every FC. Due empty
 * rerenders prevention we cannot just use ctxMap in main context Provider.
 */

export function createMapStore(contexts: MapContext[], opts?: IOpts) {
  const Provider: FC = ({ children }) => {
    const _Store = createContext(null);
    const ctxMap: ContextMap = {};

    for (let ctx of contexts) {
      if (opts) {
        opts.label = ctx.name;
        ctx.state = persister(opts, ctx.state, true);
      }

      /* eslint-disable react-hooks/rules-of-hooks */
      const [state, dispatch] = useReducer(ctx.reducer as Reducer, ctx.state);
      ctxMap[ctx.name] = createContext({ state, dispatch });

      if (opts) useMiddleware(state, opts);
      /* eslint-enable react-hooks/rules-of-hooks */
    }

    const selector = createSubContextSelector(ctxMap);

    return (
      <_Store.Provider value={null}>
        {Array.isArray(children)
          ? children.map((child: any, key) =>
            React.cloneElement(child, { selector, key })
          )
          : React.cloneElement(children as any, { selector })}
      </_Store.Provider>
    );
  };

  return { Provider };
}

