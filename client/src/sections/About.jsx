import { motion } from "framer-motion";
import { Code2, Lightbulb, Puzzle, Users } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { profile, aboutCards } from "../data/profile";

const icons = [Code2, Puzzle, Lightbulb, Users];

export default function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading index="01" title="About Me" description="A quick look at who I am and what drives me." />

      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-ink-secondary"
        >
          <p>{profile.intro}</p>
          <p>
            I'm currently pursuing {profile.department} at {profile.college}, where I've been building a
            foundation in programming, data structures, and web technologies.
          </p>
          <p>
            My career interests span {profile.careerInterests.slice(0, -1).join(", ")} and{" "}
            {profile.careerInterests[profile.careerInterests.length - 1]}. I'm actively growing as a full stack
            developer while building penetration testing fundamentals through labs and self-study.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {profile.careerInterests.map((interest) => (
              <span key={interest} className="rounded-full border border-surface-border px-3 py-1 text-xs text-ink-muted">
                {interest}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {aboutCards.map((card, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-panel p-5"
              >
                <Icon className="mb-3 h-6 w-6 text-accent-cyan" />
                <h3 className="mb-1 text-base font-semibold text-ink-primary">{card.title}</h3>
                <p className="text-sm text-ink-muted">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
