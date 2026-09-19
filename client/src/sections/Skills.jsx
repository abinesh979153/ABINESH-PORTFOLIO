import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { skillCategories } from "../data/skills";

const levelColor = {
  Learning: "text-accent-amber border-accent-amber/30",
  Comfortable: "text-accent-cyan border-accent-cyan/30",
  Intermediate: "text-accent-violet border-accent-violet/30",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(() => ["All", ...skillCategories.map((c) => c.category)], []);

  const visibleGroups =
    activeCategory === "All" ? skillCategories : skillCategories.filter((c) => c.category === activeCategory);

  return (
    <section id="skills" className="section-shell">
      <SectionHeading index="02" title="Skills" description="Technologies and tools I use, at their honest proficiency level." />

      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "border-accent-cyan text-accent-cyan"
                : "border-surface-border text-ink-muted hover:border-accent-cyan/40 hover:text-ink-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.06 }}
            className="glass-panel p-5"
          >
            <h3 className="mb-4 font-mono text-sm text-ink-muted">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <motion.span
                  key={skill.name}
                  whileHover={{ scale: 1.06 }}
                  className={`rounded-lg border bg-surface-panel px-3 py-1.5 text-xs font-medium ${levelColor[skill.level]}`}
                >
                  {skill.name}
                  <span className="ml-1.5 text-[10px] text-ink-muted">· {skill.level}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
