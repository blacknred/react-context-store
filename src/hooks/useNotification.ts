import { useCallback } from "react";

/** Native notification hook */
const useNotification = (title: string, options: NotificationOptions) => {
  const fireNotify = useCallback(() => {
    if (!("Notification" in window)) return;

    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        }
      });
    } else {
      new Notification(title, options);
    }
  }, []);

  return fireNotify;
};

export default useNotification;

// Usage
// const triggerNotif = useNotification("hello world", {
//   dir: "rtl",
//   body: "Nice!"
// });
// <button onClick={triggerNotif}>Hello</button>
