import { motion, useScroll, useSpring } from "framer-motion";

// A thin progress bar fixed to the top of the viewport, filling as the
// visitor scrolls down the page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan"
    />
  );
}
