import { useEffect, useState } from "react";

// Simple typewriter effect: types out `text`, pauses, and (optionally) stops.
// Respects prefers-reduced-motion by rendering the full text immediately.
export default function useTypewriter(text, { speed = 45, startDelay = 300 } = {}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayed(text);
      return;
    }

    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return displayed;
}
