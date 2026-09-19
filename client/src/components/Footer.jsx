import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";

export default function Footer() {
  const links = [
    profile.github && { icon: Github, href: profile.github, label: "GitHub", external: true },
    profile.linkedin && { icon: Linkedin, href: profile.linkedin, label: "LinkedIn", external: true },
    profile.email && { icon: Mail, href: `mailto:${profile.email}`, label: "Email", external: false },
  ].filter(Boolean);

  return (
    <footer className="border-t border-surface-border bg-surface-app py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:px-8">
        {links.length > 0 && (
          <div className="flex items-center gap-5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                aria-label={link.label}
                className="text-ink-muted hover:text-accent-cyan"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        )}
        <p className="font-mono text-xs text-ink-muted">
          © {new Date().getFullYear()} {profile.name}. Built with the MERN stack.
        </p>
      </div>
    </footer>
  );
}
