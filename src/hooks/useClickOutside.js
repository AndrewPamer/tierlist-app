import { useEffect, useRef } from "react";

export default function useClickOutside(callback) {
  const elementRef = useRef();

  useEffect(() => {
    function click(event) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        alert("Clicked outside");
        callback();
      }
    }
    document.addEventListener("click", click);

    return () => {
      document.removeEventListener("click", click);
    };
  }, []);

  return elementRef;
}
