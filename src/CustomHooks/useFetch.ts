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