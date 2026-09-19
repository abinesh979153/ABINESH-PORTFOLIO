import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, ShieldCheck, Code2, Database, Terminal as TerminalIcon } from "lucide-react";
import { profile } from "../data/profile";
import useTypewriter from "../hooks/useTypewriter";
import MagneticButton from "../components/MagneticButton";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const typedRole = useTypewriter(profile.roleLine2, { speed: 40, startDelay: 900 });

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Mouse-following radial glow — desktop only in effect, harmless on touch */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(57,230,200,0.08), transparent 60%)`,
        }}
      />

      <div className="section-shell grid items-center gap-16 !py-0 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-4 font-mono text-sm text-accent-cyan">
            $ whoami
          </motion.p>
          <motion.h1 variants={item} className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Hi, I'm {profile.name}
          </motion.h1>
          <motion.p variants={item} className="mt-3 text-xl font-medium text-ink-secondary sm:text-2xl">
            {profile.roleLine1}
          </motion.p>
          <motion.p variants={item} className="text-gradient mt-1 min-h-[2rem] text-xl font-semibold sm:text-2xl">
            {typedRole}
            <span className="animate-pulse text-accent-cyan">|</span>
          </motion.p>
          <motion.p variants={item} className="mt-6 max-w-xl text-ink-muted">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton onClick={() => scrollTo("projects")} className="btn-primary">
              Explore My Work
            </MagneticButton>
            <MagneticButton as="a" href={profile.resumeUrl} download className="btn-secondary">
              <Download className="h-4 w-4" /> Download Resume
            </MagneticButton>
            <MagneticButton onClick={() => scrollTo("contact")} className="btn-secondary">
              <Mail className="h-4 w-4" /> Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm items-center justify-center sm:flex"
        >
          <div className="absolute inset-6 rounded-full border border-accent-cyan/20" />
          <div className="absolute inset-0 rounded-full border border-dashed border-accent-violet/20 animate-[spin_30s_linear_infinite]" />
          <div className="glass-panel flex h-52 w-52 items-center justify-center rounded-full shadow-[0_0_60px_rgba(57,230,200,0.15)]">
            <ShieldCheck className="h-20 w-20 text-accent-cyan animate-glow" />
          </div>

          <motion.div
            className="glass-panel absolute -left-2 top-6 flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs text-accent-violet animate-floaty"
            style={{ animationDelay: "0.5s" }}
          >
            <Code2 className="h-3.5 w-3.5" /> {"<Dev/>"}
          </motion.div>
          <motion.div
            className="glass-panel absolute -right-4 bottom-10 flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs text-accent-cyan animate-floaty"
            style={{ animationDelay: "1.2s" }}
          >
            <TerminalIcon className="h-3.5 w-3.5" /> npm run build
          </motion.div>
          <motion.div
            className="glass-panel absolute -right-6 top-2 flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs text-accent-amber animate-floaty"
            style={{ animationDelay: "0.9s" }}
          >
            <Database className="h-3.5 w-3.5" /> MongoDB
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Scroll down"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-muted hover:text-accent-cyan"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
