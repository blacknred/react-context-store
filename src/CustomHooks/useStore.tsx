import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  createContext,
  useMemo
} from "react";
import isEqual from "react-fast-compare";

// Usage
// import React from "react";
// import { store, reducer } from "./store";
// import { useStore } from "./hooks";

// const [Store, Provider] = storeFactory(store, reducer);

// function Component(props) {
//   const [state, dispatch] = useStore(Store);

//   const handleClick = React.useCallback(() => {
//     dispatch({ type: "ACTION_ONE" });
//   }, [dispatch]);

//   return <button onClick={handleClick}>dispatch smthng</button>;
// }

function storeFactory(initialState?: object, reducer?: any, logger?: boolean) {
  const Store = createContext(initialState);

  let Provider;

  if (!!reducer) {
    Provider = function({ children }) {
      const [state, dispatch] = useReducer(reducer, initialState);
      const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

      useEffect(() => {
        if (logger) {
          console.log(JSON.stringify(state, null, 1));
        }
      }, [state]);

      return <Store.Provider value={value}>{children}</Store.Provider>;
    };
  } else {
    Provider = function({ children }) {
      const [state, setState] = useState(initialState);
      const value = useMemo(() => ({ state, setState }), [state, setState]);

      useEffect(() => {
        if (logger) {
          console.log(JSON.stringify(state, null, 1));
        }
      }, [state]);
      
      return <Store.Provider value={value}>{children}</Store.Provider>;
    };
  }

  return [Store, Provider];
}

function useStore(Ctx, deps) {
  const [props, setProps] = useState(deps);
  const { dispatch, state } = useContext(Ctx);

  useEffect(() => {
    if (!isEqual(state, props)) {
      setProps(state);
    }
  }, [state, setProps, props]);

  return [props, dispatch];
}

export { storeFactory };
export default useStore;
