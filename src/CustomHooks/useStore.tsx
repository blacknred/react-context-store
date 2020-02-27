import {
  useMemo,
  useState,
  useEffect,
  useContext,
  useReducer,
  createContext
} from "react";
import * as React from "react";
import isEqual from "react-fast-compare";

function storeFactory(initialState?: object, reducer?: any, logger?: boolean) {
  const Store = createContext(initialState);

  function Provider({ children }: { children?: any }) {
    let state: Object;
    let mutator: Function;

    if (typeof reducer === undefined || reducer === null) {
      [state, setState] = useState(initialState);

      mutator = function(val) {
        setState({ ...state, ...val });
      };
    } else {
      [state, mutator] = useReducer(reducer, initialState);
    }

    const value = useMemo(() => ({ state, mutator }), [state, mutator]);

    useEffect(() => {
      if (logger) {
        console.log(JSON.stringify(state, null, 1));
      }
    }, [state]);

    return <Store.Provider value={value}>{children}</Store.Provider>;
  }

  return [Store, Provider];
}

function useStore(Ctx: Object, deps: []) {
  const [props, setProps] = useState(deps);
  const { mutator, state } = useContext(Ctx);

  useEffect(() => {
    if (!isEqual(state, props)) {
      setProps(state);
    }
  }, [state, setProps, props]);

  return [props, mutator];
}

export { storeFactory };
export default useStore;
