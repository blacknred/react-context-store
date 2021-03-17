import { useRef, useState, useEffect, useCallback } from "react";

export const BASE_URL = "https://picsum.photos";

interface Input<T> {
  response: T | null;
  error: Error | null;
}

export default function useFetch<T>(url: string, options?: object): Input<T> {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const inUse = useRef(true);

  const fetcher = useCallback(async () => {
    try {
      setResponse(null);
      const validUrl = url.includes("://") ? url : `${BASE_URL}${url}`;
      const res = await fetch(validUrl, options);
      const data = await res.json();
      if (!inUse.current) return;
      setResponse(data);
    } catch (e) {
      if (!inUse.current) return;
      setError(e);
    }
  }, [url, options, setResponse]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  useEffect(
    () => () => {
      inUse.current = false;
    },
    []
  );

  return { response, error };
}
