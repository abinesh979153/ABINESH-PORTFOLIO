import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { toolGroups } from "../data/tools";

export default function Toolbox() {
  return (
    <section id="toolbox" className="section-shell">
      <SectionHeading index="08" title="My Toolbox" description="Hover a tool to see what it's for." />

      <div className="space-y-10">
        {toolGroups.map((group) => (
          <div key={group.group}>
            <h3 className="mb-4 font-mono text-sm text-ink-muted">{group.group}</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {group.tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="glass-panel group relative overflow-hidden p-4 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(57,230,200,0.12)]"
                >
                  <Wrench className="mb-2 h-5 w-5 text-accent-cyan" />
                  <p className="text-sm font-semibold text-ink-primary">{tool.name}</p>
                  <p className="mt-1 text-xs text-ink-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {tool.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
