import { motion } from "framer-motion";
import { Briefcase, Trophy, FileText, Wrench, Sparkles } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { experience } from "../data/experience";

const typeIcon = {
  internship: Briefcase,
  hackathon: Trophy,
  paper: FileText,
  workshop: Wrench,
  other: Sparkles,
};

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <SectionHeading
        index="06"
        title="Experience & Activities"
        description="Internships, hackathons, paper presentations and workshops — edit client/src/data/experience.js to keep this current."
      />

      {experience.length === 0 ? (
        <div className="glass-panel p-8 text-center text-ink-muted">
          Nothing added yet — add entries to <code className="text-accent-cyan">src/data/experience.js</code>.
        </div>
      ) : (
        <div className="relative space-y-8 border-l border-surface-border pl-8">
          {experience.map((exp, i) => {
            const Icon = typeIcon[exp.type] || Sparkles;
            return (
              <motion.div
                key={exp.title + i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border border-accent-violet/40 bg-surface-app">
                  <Icon className="h-4 w-4 text-accent-violet" />
                </span>
                <p className="font-mono text-xs text-accent-violet">{exp.period}</p>
                <h4 className="mt-1 text-base font-semibold text-ink-primary">{exp.title}</h4>
                <p className="text-sm text-ink-muted">{exp.organization}</p>
                <p className="mt-2 text-sm text-ink-muted">{exp.description}</p>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
