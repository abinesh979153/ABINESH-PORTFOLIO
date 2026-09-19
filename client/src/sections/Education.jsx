import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { education } from "../data/profile";

export default function Education() {
  return (
    <section id="education" className="section-shell">
      <SectionHeading index="05" title="Education" description="Academic background." />

      <div className="relative space-y-10 border-l border-surface-border pl-8">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border border-accent-cyan/40 bg-surface-app">
              <GraduationCap className="h-4 w-4 text-accent-cyan" />
            </span>
            <p className="font-mono text-xs text-accent-cyan">{edu.period}</p>
            <h4 className="mt-1 text-base font-semibold text-ink-primary">{edu.degree}</h4>
            <p className="text-sm text-ink-muted">{edu.institution}</p>
            <p className="mt-2 text-sm text-ink-muted">{edu.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
