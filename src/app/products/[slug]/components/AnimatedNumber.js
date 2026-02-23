import { useEffect, useRef, useState } from "react";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function useAnimatedNumber(value, duration = 600) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const raf = useRef(null);

  useEffect(() => {
    const startVal = prev.current;
    const diff = value - startVal;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutCubic(progress);

      setDisplay(Math.round(startVal + diff * eased));

      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        prev.current = value;
      }
    };

    raf.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);

  return display;
}
