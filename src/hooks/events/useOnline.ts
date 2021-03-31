import { useState } from "react";
import useEvent from "./useEvent";

/** Check online status */
const useOnline = (handler?: (v: any) => any) => {
  const [online, set] = useState(navigator ? navigator.onLine : true);

  const eventHandler = (status: boolean) => () => {
    if (handler) handler(status);
    else set(status);
  };

  useEvent("online", eventHandler(true));
  useEvent("offline", eventHandler(false));

  return online;
};

export default useOnline;
