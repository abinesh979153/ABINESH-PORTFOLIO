import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import Terminal from "../components/Terminal";
import { cybersecurityProfile, terminalLines } from "../data/cybersecurity";

export default function Cybersecurity() {
  return (
    <section id="cybersecurity" className="section-shell">
      <SectionHeading index="07" title="Cybersecurity & Penetration Testing" />

      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="glass-panel flex items-center gap-4 p-5">
            <ShieldCheck className="h-9 w-9 shrink-0 text-accent-cyan" />
            <div>
              <p className="text-sm text-ink-muted">{cybersecurityProfile.headline}</p>
              <p className="text-lg font-semibold text-ink-primary">{cybersecurityProfile.level}</p>
            </div>
          </div>

          <p className="text-sm text-ink-muted">{cybersecurityProfile.summary}</p>

          <div>
            <h3 className="mb-3 font-mono text-sm text-ink-muted">Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {cybersecurityProfile.topics.map((topic) => (
                <span key={topic} className="rounded-full border border-surface-border px-3 py-1 text-xs text-ink-secondary">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-sm text-ink-muted">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {cybersecurityProfile.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-accent-cyan/30 px-3 py-1 text-xs text-accent-cyan">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-ink-muted/70">
            All security testing is done in authorized lab environments or personal/permitted setups only.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Terminal title="abinesh@security-lab" lines={terminalLines} />
        </motion.div>
      </div>
    </section>
  );
}
