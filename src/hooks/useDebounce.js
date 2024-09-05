import { useEffect, useState } from "react";

export default function useDebounce(val, delay) {
  const [dbVal, setdbVal] = useState(val);
  useEffect(() => {
    const handler = setTimeout(() => {
      setdbVal(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);
  return dbVal;
}
