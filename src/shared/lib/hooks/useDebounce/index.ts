import { useEffect, useState } from "react";

export function useDebounce(val: string, delay: number = 700) {
  const [value, setValue] = useState(val);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      setValue(val);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [val, delay]);

  return value;
}
