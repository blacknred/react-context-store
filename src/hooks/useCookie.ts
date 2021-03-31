import { useState } from "react";

const setCookie = (
  name: string,
  value: string,
  days: number = 1,
  path?: string
) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=${path}`;
};

const getCookie = (name: string) =>
  document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");

/** Cookie hook */
function useCookie(cookieName: string, initialValue?: string) {
  const [cookieValue, setCookieValue] = useState<string | undefined>(
    getCookie(cookieName) || initialValue
  );

  const updateCookie = (value: string, days = 365, path = "/") => {
    setCookieValue(value);
    setCookie(cookieName, value, days, path);
  };

  const deleteCookie = (path = "/") => {
    updateCookie("", -1, path);
    setCookieValue(undefined);
  };

  return [cookieValue, updateCookie, deleteCookie];
}

export default useCookie;

// Usage
// const [userToken, setUserToken, deleteUserToken] = useCookie("token", "0");
// return (
//   <div>
//     <p>{userToken}</p>
//     <button onClick={() => setUserToken("123")}>Change token</button>
//     <button onClick={() => deleteUserToken()}>Delete token</button>
//   </div>
// );
