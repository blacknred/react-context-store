import * as React from "react";
import styled from "styled-components";
import { usePosition, useFetch } from "../hooks";

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
  isInfinite?: boolean;
  url?: string;
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


// export const BASE_URL = "https://picsum.photos";
// 1 random
// https://picsum.photos/200/300[.jpg,.webp]?grayscale&blur=2
// 1 cached random
// https://picsum.photos/seed/{seed}/200/300?grayscale&blur=2
// 1 static
// https://picsum.photos/id/237/200/300
// list
// https://picsum.photos/v2/list?page=2&limit=100
// [
//   {
//       "id": "0",
//       "author": "Alejandro Escamilla",
//       "width": 5616,
//       "height": 3744,
//       "url": "https://unsplash.com/...",
//       "download_url": "https://picsum.photos/..."
//   }
// ]

// theme
// --------
// random|saved
// --------
// colls(select)
// width/height(inputs)
// grayscale(check)
// blur(slider)