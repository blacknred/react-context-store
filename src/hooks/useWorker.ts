import { useState, useEffect } from "react";

type Attr = {
  [key: string]: any;
};

/** Worker usage hook */
function useWorker(
  scriptPath: string,
  workerOptions: WorkerOptions,
  attributes?: Attr
) {
  const [worker, setWorker] = useState<Worker>();

  useEffect(() => {
    const newWorker = new Worker(scriptPath, workerOptions);
    // attach attributes
    if (attributes) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in attributes) {
        // @ts-ignore
        newWorker[key] = attributes[key];
      }
    }

    setWorker(newWorker);

    return () => {
      newWorker.terminate();
      setWorker(undefined);
    };
  }, [scriptPath]);

  return worker;
}

export default useWorker;

// Usage
// const [value, setValue] = useState(0);
// useWorker('/worker.js', {
//   onMessage: (e) => {
//     console.log('message received from worker');
//     console.log(e.data);
//     setValue(e.data);
//   },
//   onMessageError: (e) => {
//     console.log(e);
//   },
// });
