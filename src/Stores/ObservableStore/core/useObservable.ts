import { useEffect, useState } from "react";
import Observable from "./Observable";

function useObservable<T>(observable: Observable<T>): T {
  const [val, setVal] = useState(observable.get());

  useEffect(() => {
    return observable.subscribe(setVal);
  }, [observable]);

  return val;
}

export default useObservable;
