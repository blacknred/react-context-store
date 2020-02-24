import * as React from "react";
import styled from "styled-components";
import { usePosition, useFetch } from "../CustomHooks";

const Pane = styled.div`
  flex: 1;
  padding: 1em;
  background-color: rgb(222, 203, 223);
  margin-left: 250px;
  height: 100vh;
`;

type Props = {
  isInfinite: boolean;
  url: string;
};

export default function Feed(props: Props) {
  React.useEffect(() => {
    console.log(props);
  }, [props]);

  return <Pane>feed</Pane>;
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
