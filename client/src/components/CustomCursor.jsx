import { useEffect, useRef, useState } from "react";

// A subtle custom cursor for desktop pointer devices only.
// Automatically disables itself on touch devices and respects reduced motion
// by simply not rendering anything (the browser's native cursor stays put).
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return; // leave native cursor untouched

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    let ringX = 0, ringY = 0;

    const handleMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      ringX = e.clientX;
      ringY = e.clientY;
    };

    // Ring trails slightly behind the dot for a soft trailing effect.
    let raf;
    const animateRing = () => {
      if (ringRef.current) {
        const currentLeft = parseFloat(ringRef.current.style.left) || ringX;
        const currentTop = parseFloat(ringRef.current.style.top) || ringY;
        const nextLeft = currentLeft + (ringX - currentLeft) * 0.18;
        const nextTop = currentTop + (ringY - currentTop) * 0.18;
        ringRef.current.style.left = `${nextLeft}px`;
        ringRef.current.style.top = `${nextTop}px`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    const handleOver = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea")) setHovering(true);
    };
    const handleOut = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea")) setHovering(false);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ width: hovering ? 10 : 8, height: hovering ? 10 : 8 }} />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          borderColor: hovering ? "rgba(57,230,200,0.9)" : "rgba(57,230,200,0.5)",
        }}
      />
    </>
  );
}
