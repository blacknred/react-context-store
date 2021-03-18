import { FC } from "react";
import styled from "styled-components";
import { useSize } from "../CustomHooks";

export const Image = styled.image<{ src: string }>`
  max-width: '100%;
  height: 'auto;
  border-radius: 8px;
  resize: both;
  box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%), 0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
`;

const ImageItem: FC<{ data: any }> = (props) => {
  const [size, ref] = useSize(props.data);

  return (
    <div ref={ref}>
      <pre>{JSON.stringify(size, null, 2)}</pre>
    </div>
  );
}

export default ImageItem;
