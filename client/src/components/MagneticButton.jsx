import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Wraps a button/link with a subtle magnetic pull toward the cursor.
// Disabled automatically on touch devices via the pointer-fine media check.
export default function MagneticButton({ children, className = "", as: Component = "button", ...props }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isFinePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  const handleMouseMove = (e) => {
    if (!isFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: relX * 0.25, y: relY * 0.25 });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const MotionComponent = motion[Component] || motion.button;

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
