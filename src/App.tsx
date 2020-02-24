import * as React from "react";
import styled from "styled-components";
import { Feed, Options } from "./Components";
import "./styles.css";

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
`;

const Header = styled.div<{ primary?: boolean }>`
  margin-bottom: 5rem;
  color: ${props => (props.primary ? "white" : "palevioletred")};
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
    <div className="app">
      <Sidebar>
        <Header>
          <h2>Image feed</h2>
          <code>https://picsum.photos</code>
        </Header>
        <Options
          setInfinite={handleToggle("isInfinite")}
          changeUrl={handleChange("url")}
        />
      </Sidebar>
      <Feed />
    </div>
  );
}
// useCallback(recalc only if changes in deps; no return(will be recalc errtime)) :
// 1.reduce updates for memoed Component(instead of lambdas)
// 2.not pass lambdas(need for args) in map, send args in the Component instead


// export const Styled = {
//   Button,
//   Button__Icon,
//   Button__Text,
// };