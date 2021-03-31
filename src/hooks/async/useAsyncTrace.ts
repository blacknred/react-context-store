import { useCallback, useState } from "react";

type TStatus = "IDLE" | "PROCESSING" | "ERROR" | "SUCCESS";

/* Trace the state of async operation */
function useAsyncTrace<T extends any[], R = any>(
  task: (...args: T) => Promise<R>
) {
  const [status, setStatus] = useState<TStatus>("IDLE");
  const [message, setMessage] = useState("");

  const run = useCallback(async (...arg: T) => {
    setStatus("PROCESSING");
    try {
      const resp: R = await task(...arg);
      setStatus("SUCCESS");
      return resp;
    } catch (e) {
      let message = e?.response?.data?.error?.message || e.message;
      setMessage(message);
      setStatus("ERROR");
      throw e;
    }
  }, []);

  const reset = useCallback(() => {
    setMessage("");
    setStatus("IDLE");
  }, []);

  return {
    run,
    status,
    message,
    reset
  };
}

export default useAsyncTrace;

// Usage
// const task = useAsyncTrace(async (data: any) => myApiRequest(data));
// task.run(data);
// useEffect(() => {
//   console.log(task.status); // 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
// }, [task.status]);
