import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { profile } from "../data/profile";
import { sendContactMessage } from "../services/api";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim()) next.message = "Message is required";
    else if (form.message.length > 5000) next.message = "Message is too long";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await sendContactMessage(form);
      setStatus("success");
      setStatusMessage(res.data.message || "Message sent successfully.");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setStatusMessage(
        err.response?.data?.message || "Something went wrong while sending your message. Please try again."
      );
    }
  };

  const contactLinks = [
    profile.email && { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
    profile.location && { icon: MapPin, label: "Location", value: profile.location, href: null },
  ].filter(Boolean);

  const socialLinks = [
    profile.github && { icon: Github, label: "GitHub", href: profile.github },
    profile.linkedin && { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
  ].filter(Boolean);

  return (
    <section id="contact" className="section-shell">
      <SectionHeading index="10" title="Get In Touch" description="Have a project or opportunity in mind? Send a message." />

      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {contactLinks.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="glass-panel flex items-start gap-4 p-5">
                <Icon className="mt-1 h-5 w-5 text-accent-cyan" />
                <div>
                  <p className="text-sm font-semibold text-ink-primary">{item.label}</p>
                  <p className="text-sm text-ink-muted">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (
              <a key={item.label} href={item.href} className="block transition-transform hover:-translate-y-0.5">
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}

          {socialLinks.length > 0 && (
            <div className="flex gap-3 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-border text-ink-secondary transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          noValidate
          className="glass-panel space-y-5 p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="field-label">Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} className="field-input" placeholder="Your name" />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="field-label">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="field-input" placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="field-label">Subject</label>
            <input id="subject" name="subject" value={form.subject} onChange={handleChange} className="field-input" placeholder="What is this about?" />
            {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="field-label">Message</label>
            <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} className="field-input resize-none" placeholder="Tell me a bit about it..." />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
          </div>

          <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60">
            {status === "loading" ? "Sending..." : (<><Send className="h-4 w-4" /> Send Message</>)}
          </button>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 rounded-xl border border-accent-cyan/30 bg-accent-cyan/5 p-3 text-sm text-accent-cyan"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" /> {statusMessage}
            </motion.div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" /> {statusMessage}
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
