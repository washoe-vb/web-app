import { useState, useEffect } from "react";

export function useDebounce (value: string, delay: number) {
  const [ debouncedValue, setDebouncedValue ] = useState(value);

  useEffect(() => {
    const handler = setTimeout(setDebouncedValue, delay, value);
    return () => clearTimeout(handler);
  }, [ value, delay ]);

  return debouncedValue;
}
