import * as React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div<{ primary?: boolean }>`
  margin-bottom: 5rem;
  padding: 5% 10%;
  text-decoration: none;
  color: ${props => props.theme.color};
`;

const 

type Props = {
  onClick: any
};

export default function Header(props: Props) {
    const changeTheme = React.useCallback(
    e => {
      if (theme === lightTheme) setTheme(darkTheme);
      else setTheme(lightTheme);
    },
    [theme]
  );

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

      <ThemeButton onClick={props.onClick}> </ThemeButton>
    </HeaderContainer>
  );
}
