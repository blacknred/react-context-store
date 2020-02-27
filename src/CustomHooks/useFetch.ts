import { useRef, useState, useEffect } from "react";

type IState = {
  data: null | [];
  isLoading: boolean;
}

export default function useFetch(url: string) {
  const inUse = useRef(true);
  const [state, setState] = useState<IState>({ data: null, isLoading: false });

  useEffect(() => {
    return () => {
      inUse.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, isLoading: true });

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (inUse.current) {
          setState({ data, isLoading: false });
        }
      })
      .catch(e => {
        setState({ data: null, isLoading: false });
      });
  }, [url, setState]);

  return state;
}
