import * as React from "react";
import { Feed, Options } from "./Components";
import "./styles.css";

interface AppState {
  [name: string]: boolean | string;
}

export default function App() {
  const [appState, changeAppState] = React.useState<AppState>({
    isInfinite: false,
    url: ""
  });

  function handleToggle(name: string) {
    return function() {
      changeAppState({
        ...appState,
        [name]: !appState[name]
      });
    };
  }

  function handleChange(name: string) {
    return function(val: string) {
      changeAppState({
        ...appState,
        [name]: val
      });
    };
  }

  return (
    <div className="app">
      <div>
        <header>
          <h2>Image feed</h2>
          <code>https://picsum.photos</code>
        </header>
        <Options
          setInfinite={handleToggle("isInfinite")}
          changeUrl={handleChange("url")}
        />
      </div>
      <div>{/* <Feed {...appState} /> */}</div>
    </div>
  );
}

// useCallback(recalc only if changes in deps; no return(will be recalc errtime)) :
// 1.reduce updates for memoed Component(instead of lambdas)
// 2.not pass lambdas(need for args) in map, send args in the Component instead
