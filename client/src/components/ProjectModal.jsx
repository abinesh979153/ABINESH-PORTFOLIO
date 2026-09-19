import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X, FolderGit2 } from "lucide-react";

// Full project detail overlay, shown when "View Details" is clicked.
// Only renders sections that actually have data — never invents content.
export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel max-h-[85vh] w-full max-w-2xl overflow-y-auto p-0"
        >
          <div className="relative flex h-48 items-center justify-center overflow-hidden bg-surface-panel">
            {project.image ? (
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            ) : (
              <FolderGit2 className="h-12 w-12 text-ink-muted/60" />
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-ink-primary hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-5 p-6 sm:p-8">
            <div>
              <h3 className="text-2xl font-semibold text-ink-primary">{project.title}</h3>
              {project.category && <p className="mt-1 font-mono text-xs text-accent-cyan">{project.category}</p>}
            </div>

            {project.description && (
              <div>
                <h4 className="mb-1 text-sm font-semibold text-ink-primary">Overview</h4>
                <p className="text-sm text-ink-muted">{project.description}</p>
              </div>
            )}

            {project.problem && (
              <div>
                <h4 className="mb-1 text-sm font-semibold text-ink-primary">Problem</h4>
                <p className="text-sm text-ink-muted">{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div>
                <h4 className="mb-1 text-sm font-semibold text-ink-primary">Solution</h4>
                <p className="text-sm text-ink-muted">{project.solution}</p>
              </div>
            )}

            {Array.isArray(project.features) && project.features.length > 0 && (
              <div>
                <h4 className="mb-1 text-sm font-semibold text-ink-primary">Features</h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-ink-muted">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink-primary">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-md border border-surface-border px-2 py-0.5 font-mono text-[11px] text-ink-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(project.screenshots) && project.screenshots.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink-primary">Screenshots</h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {project.screenshots.map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" className="aspect-video w-full rounded-lg object-cover" />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-secondary">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-primary">
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
