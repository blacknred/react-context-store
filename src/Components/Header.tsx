import * as React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div<{ primary?: boolean }>`
  margin-bottom: 5rem;
  padding: 5% 10%;
  text-decoration: none;
  color: ${props => props.theme.color};
`;

type Props = {
  onClick: any;
};

export default function Header(props: Props) {
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

      <button onClick={props.onClick} />
    </HeaderContainer>
  );
}
