import { useState } from "react";

function getValue(key: string, initialValue: any) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (e) {
    console.log(e);
    return initialValue;
  }
}

/** Persisted useState hook */ 
function usePersistedState<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(
    getValue(key, initialValue)
  );

  const setValue = (param: T | ((val: T) => T)) => {
    try {
      // useState argument could be a callback
      const value = param instanceof Function ? param(storedValue) : param;
      // save value
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setValue];
}

export default usePersistedState;

// Usage
// const [name, setName] = usePersistedState<string>('name', 'Bob');
