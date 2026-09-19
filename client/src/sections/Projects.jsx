import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2, Eye } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import LoadingSpinner from "../components/LoadingSpinner";
import TiltCard from "../components/TiltCard";
import ProjectModal from "../components/ProjectModal";
import { getProjects } from "../services/api";

const FILTERS = ["All", "Frontend", "React", "Full Stack", "Cybersecurity", "Other"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    let mounted = true;
    getProjects()
      .then((res) => {
        if (!mounted) return;
        setProjects(res.data.data || []);
        setStatus("success");
      })
      .catch(() => {
        if (mounted) setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const visibleProjects =
    activeFilter === "All" ? projects : projects.filter((p) => (p.category || "Other") === activeFilter);

  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        index="03"
        title="Projects"
        description="A selection of things I've built. Replace these with your own from the admin dashboard."
      />

      {status === "loading" && <LoadingSpinner label="Fetching projects..." />}

      {status === "error" && (
        <div className="glass-panel p-8 text-center text-ink-muted">
          Couldn't load projects right now. Make sure the backend server is running.
        </div>
      )}

      {status === "success" && projects.length === 0 && (
        <div className="glass-panel p-8 text-center text-ink-muted">
          No projects yet. Add some from the admin dashboard, or run <code className="text-accent-cyan">npm run seed</code> in
          the server folder.
        </div>
      )}

      {status === "success" && projects.length > 0 && (
        <>
          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                  activeFilter === cat
                    ? "border-accent-cyan text-accent-cyan"
                    : "border-surface-border text-ink-muted hover:border-accent-cyan/40 hover:text-ink-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <div className="glass-panel p-8 text-center text-ink-muted">No projects in this category yet.</div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <TiltCard className="glass-panel group overflow-hidden">
                  <div className="flex h-40 items-center justify-center overflow-hidden bg-surface-panel">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <FolderGit2 className="h-10 w-10 text-ink-muted/60" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-semibold text-ink-primary">{project.title}</h3>
                    <p className="mb-4 text-sm text-ink-muted">{project.description}</p>
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {(project.technologies || []).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-surface-border px-2 py-0.5 font-mono text-[11px] text-ink-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary !px-4 !py-2 text-xs"
                        >
                          <Github className="h-3.5 w-3.5" /> Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary !px-4 !py-2 text-xs"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                        </a>
                      )}
                      <button onClick={() => setSelectedProject(project)} className="btn-secondary !px-4 !py-2 text-xs">
                        <Eye className="h-3.5 w-3.5" /> View Details
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </>
      )}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
