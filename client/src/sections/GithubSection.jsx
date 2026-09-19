import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import LoadingSpinner from "../components/LoadingSpinner";
import { githubConfig } from "../data/github";

export default function GithubSection() {
  const [repos, setRepos] = useState(githubConfig.fallbackRepos || []);
  const [status, setStatus] = useState(githubConfig.username ? "loading" : "static");

  useEffect(() => {
    if (!githubConfig.username) return;

    let mounted = true;
    fetch(`https://api.github.com/users/${githubConfig.username}/repos?sort=updated&per_page=6`)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API request failed");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setRepos(
          data.map((r) => ({
            name: r.name,
            description: r.description || "",
            language: r.language || "",
            stars: r.stargazers_count,
            forks: r.forks_count,
            url: r.html_url,
          }))
        );
        setStatus("success");
      })
      .catch(() => {
        if (mounted) {
          setRepos(githubConfig.fallbackRepos || []);
          setStatus("fallback");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="github" className="section-shell">
      <SectionHeading index="09" title="GitHub Repositories" description="A few public repositories, pulled live from GitHub." />

      {status === "loading" && <LoadingSpinner label="Fetching repositories..." />}

      {status !== "loading" && repos.length === 0 && (
        <div className="glass-panel p-8 text-center text-ink-muted">
          No repositories configured yet — set <code className="text-accent-cyan">githubUsername</code> or{" "}
          <code className="text-accent-cyan">fallbackRepos</code> in <code>src/data/github.js</code>.
        </div>
      )}

      {repos.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="glass-panel block p-5"
            >
              <div className="mb-2 flex items-center gap-2">
                <Github className="h-4 w-4 text-accent-cyan" />
                <p className="truncate font-semibold text-ink-primary">{repo.name}</p>
              </div>
              {repo.description && <p className="mb-4 line-clamp-2 text-sm text-ink-muted">{repo.description}</p>}
              <div className="flex items-center gap-4 text-xs text-ink-muted">
                {repo.language && <span>{repo.language}</span>}
                <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {repo.stars ?? 0}</span>
                <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {repo.forks ?? 0}</span>
                <ExternalLink className="ml-auto h-3.5 w-3.5" />
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
