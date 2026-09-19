import { motion, useReducedMotion } from "framer-motion";

// A subtle animated grid + glow backdrop used behind the whole page.
// Purely decorative, sits fixed behind all content with pointer-events disabled.
// Grid/blob intensity dims automatically in light mode via CSS variables.
export default function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-surface-app transition-colors duration-300">
      <div
        className="absolute inset-0 bg-grid-pattern bg-[size:44px_44px]"
        style={{ opacity: "var(--grid-opacity)" }}
      />
      <motion.div
        className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent-cyan/20 blur-[120px]"
        style={{ opacity: "var(--blob-opacity)" }}
        animate={shouldReduceMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-32 h-[26rem] w-[26rem] rounded-full bg-accent-violet/20 blur-[120px]"
        style={{ opacity: "var(--blob-opacity)" }}
        animate={shouldReduceMotion ? {} : { opacity: [0.5, 0.25, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-app/60 to-surface-app" />
    </div>
  );
}
