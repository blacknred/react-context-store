import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Header, Feed, Options } from "./Components";
import { lightTheme, darkTheme } from "./Constants/themes";
import "./styles.css";

const Layout = styled.div<{ theme?: any }>`
  display: flex;
  justify-content: space-between;
  font-family: Roboto, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: ${props => props.theme.bg};
`;

function ThemedLayout(props) {
  const [theme, setTheme] = React.useState(lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <Layout>{props.children}</Layout>
    </ThemeProvider>
  );
}

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

  const changeTheme = React.useCallback(
    e => {
      if (theme === lightTheme) setTheme(darkTheme);
      else setTheme(lightTheme);
    },
    [theme]
  );

  return (
    <ThemedLayout>
      <Sidebar>
        <Header isLight onClick={changeTheme} />
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

// export const Styled = {
//   Button,
//   Button__Icon,
//   Button__Text,
// };
