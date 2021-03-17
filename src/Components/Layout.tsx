import { useState, FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import { withBreakpointProvider, useBreakpoint } from "../CustomHooks";
import { COLORS } from "../Constants";
import { Color } from '../types';

const Layout = styled.div<{ theme: Color }>`
  display: flex;
  justify-content: space-between;
  font-family: Roboto, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: ${props => props.theme.bg};
`;

export const ThemedLayout: FC = ({ children }) => {
  const [theme, setTheme] = useState<Color>(COLORS.light);
  // const j = useBreakpoint();

  // console.log(j)
  // width,
  // height,
  // isSmallDevice: width < 375

  return (
    <ThemeProvider theme={{ ...theme, setTheme }}>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}

export default withBreakpointProvider(ThemedLayout);