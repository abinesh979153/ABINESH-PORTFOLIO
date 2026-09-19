import { motion } from "framer-motion";

// Reused at the top of every section for a consistent, non-generic heading treatment.
export default function SectionHeading({ index, title, description }) {
  return (
    <div className="mb-14 max-w-2xl">
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-2 font-mono text-sm text-accent-cyan"
      >
        {index}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="text-3xl font-semibold sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-ink-muted"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
