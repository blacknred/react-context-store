import * as React from "react";
// import styled from "styled-components";
import { usePosition, useFetch } from "../CustomHooks";

// const Pane = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   top: 0;
//   bottom: 0;
// `;

interface IFeed {
  isInfinite: boolean;
  url: string;
}

export default function Feed(props: IFeed) {
  React.useEffect(() => {
    console.log(props);
  }, [props]);

  return <div>feed</div>;
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
