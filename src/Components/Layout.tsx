import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../Constants/themes";
import { withBreakpointProvider, useBreakpoint } from "../CustomHooks";

const Layout = styled.div<{ theme?: any }>`
  display: flex;
  justify-content: space-between;
  font-family: Roboto, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: ${props => props.theme.bg};
`;

export function ThemedLayout(props: any) {
  const [theme, setTheme] = React.useState(lightTheme);
  // const j = useBreakpoint();

  // console.log(j)

  const changeTheme = React.useCallback(
    e => {
      if (theme === lightTheme) setTheme(darkTheme);
      else setTheme(lightTheme);
    },
    [theme]
  );

  return (
    <ThemeProvider theme={{ ...theme, changeTheme }}>
      <Layout>{props.children}</Layout>
    </ThemeProvider>
  );
}

export default withBreakpointProvider(ThemedLayout);
