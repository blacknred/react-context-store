import * as React from "react";
import styled from "styled-components";
import { usePosition, useFetch } from "../CustomHooks";

const Pane = styled.div`
  flex: 1;
  background-color: ${props => props.theme.fg};
  margin-left: 25%;
  height: 150vh;
  max-width: 50rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0.3125rem 0.3125rem 0.9375rem;
  border-radius: 0.5rem;
  margin-top: 2%5;
`;

type Props = {
  isInfinite: boolean;
  url: string;
};

export default function Feed(props: Props) {
  React.useEffect(() => {
    // console.log(props);
  }, [props]);

  return <Pane/>;
  // const position = usePosition(isInfinite);
  // const { data, isLoading } = useFetch(url);

  // return (
  //   <div>
  //     {isLoading ? (
  //       <p>...loading</p>
  //     ) : !data ? (
  //       <p>error</p>
  //     ) : (
  //       data.map(post => (
  //         <p style={{ textAlign: "left" }}>
  //           <b>{post.title}</b>
  //           <div>{post.body}</div>
  //         </p>
  //       ))
  //     )}
  //   </div>
}
