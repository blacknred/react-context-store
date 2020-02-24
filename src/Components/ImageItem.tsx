import * as React from "react";
import { useSize } from "../CustomHooks";



type Props = {
  data: {};
}

export default function ImageItem(props: Props) {
  const [size, ref] = useSize(props.data); // []

  return (
    <div ref={ref}>
      <pre>{JSON.stringify(size, null, 2)}</pre>
    </div>
  );
}
