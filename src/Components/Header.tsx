import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { Store } from "../store";
import { useStore } from "../CustomHooks";

const HeaderContainer = styled.div<{ primary?: boolean }>`
  margin-bottom: 5rem;
  padding: 5% 10%;
  text-decoration: none;
  color: ${props => props.theme.color};
`;

const ThemeButton = styled.button`
  width: 50px;
  height: 20px;
  outline: none;
  border: 0;
  background-color: ${props => props.theme.fg};
`;

export default function Header() {
  const { changeTheme } = React.useContext(ThemeContext);
  const [state, dispatch] = useStore(Store, []);

  const handleClick = React.useCallback(() => {
    dispatch({ type: "ACTION_INCR" });
  }, [dispatch]);

  return (
    <HeaderContainer>
      <h2>
        <div>image Feed</div>
        <sub>
          <code>
            <a href="https://picsum.photos">https://picsum.photos</a>
          </code>
        </sub>
      </h2>

      <ThemeButton onClick={changeTheme} />
      <br />
      <button onClick={handleClick}>{state.count}</button>
    </HeaderContainer>
  );
}
