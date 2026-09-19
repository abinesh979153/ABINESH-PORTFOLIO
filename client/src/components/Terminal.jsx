import { motion } from "framer-motion";

// A stylised, purely visual terminal window. `lines` is an array of
// { prompt, output } pairs — content only, no real command execution.
export default function Terminal({ title = "terminal", lines = [] }) {
  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <span className="terminal-dot bg-red-400/70" />
        <span className="terminal-dot bg-amber-400/70" />
        <span className="terminal-dot bg-emerald-400/70" />
        <span className="ml-3 text-xs text-ink-muted">{title}</span>
      </div>
      <div className="space-y-2 p-5">
        {lines.map((line, i) => (
          <motion.div
            key={line.prompt}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <p className="text-accent-cyan">
              <span className="text-ink-muted">$</span> {line.prompt}
            </p>
            <p className="pl-4 text-ink-secondary">{line.output}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
