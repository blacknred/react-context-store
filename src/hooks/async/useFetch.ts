import { useRef, useState, useEffect, useCallback } from "react";

export const BASE_URL = "http:localhost:3000";

interface Input<T> {
  response: T | null;
  error: Error | null;
  isLoading: boolean;
}

/** Abortable fetch hook */
function useFetch<T>(url: string, options?: object): Input<T> {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const abortController = useRef<AbortController>();
  // const inUse = useRef(true);

  const fetcher = useCallback(async () => {
    try {
      setIsLoading(true);
      const validUrl = url.includes("://") ? url : `${BASE_URL}${url}`;
      const res = await fetch(validUrl, {
        signal: abortController.current?.signal,
        ...options,
      });

      // if (!inUse.current) return;
      setResponse(await res?.json());
      setIsLoading(false);
    } catch (e) {
      // if (!inUse.current) return;
      if (e.name === "AbortError") return;
      setError(e);
      setIsLoading(false);
    }
  }, [url, options, setResponse]);

  useEffect(() => {
    abortController.current = new AbortController();

    fetcher();

    return () => {
      // inUse.current = false;
      abortController.current?.abort();
    };
  }, [fetcher]);

  return { response, error, isLoading };
}

export default useFetch;

