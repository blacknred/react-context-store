import { useState, useEffect, useRef } from "react";

const defaultSettings: PositionOptions = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
};

/** Geolocation hook */
const useGeolocation = (
  watch: boolean = false,
  options: PositionOptions = defaultSettings
) => {
  const [position, setPosition] = useState<any>();
  const [error, setError] = useState<string>();
  const watcher = useRef<number>();

  const onChange = ({ coords, timestamp }: GeolocationPosition) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp
    });
  };

  const onError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const geo = navigator?.geolocation;

    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    if (!watch) geo.getCurrentPosition(onChange, onError, options);
    else watcher.current = geo.watchPosition(onChange, onError, options);

    return () => {
      if (watcher.current) geo.clearWatch(watcher.current);
    };
  }, [options]);

  return { ...position, error };
};

export default useGeolocation;

// Usage
//  const { latitude, longitude, timestamp, accuracy, error } = useGeolocation(true);
