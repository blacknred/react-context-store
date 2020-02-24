import * as React from "react";
import styled from "styled-components";
import { Header, Feed, Options, ThemedLayout } from "./Components";
import "./styles.css";

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
`;

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
    <ThemedLayout>
      <Sidebar>
        <Header />
        <Options
          setInfinite={handleToggle("isInfinite")}
          changeUrl={handleChange("url")}
        />
      </Sidebar>
      <Feed />
    </ThemedLayout>
  );
}
// useCallback(recalc only if changes in deps; no return(will be recalc errtime)) :
// 1.reduce updates for memoed Component(instead of lambdas)
// 2.not pass lambdas(need for args) in map, send args in the Component instead
