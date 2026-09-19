import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ZoomIn } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import LoadingSpinner from "../components/LoadingSpinner";
import CertificateLightbox from "../components/CertificateLightbox";
import { getCertificates } from "../services/api";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    getCertificates()
      .then((res) => {
        if (!mounted) return;
        setCertificates(res.data.data || []);
        setStatus("success");
      })
      .catch(() => mounted && setStatus("error"));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="certificates" className="section-shell">
      <SectionHeading
        index="04"
        title="Certificates"
        description="Certifications I've earned. Add your images to client/public/certificates/ and manage entries from the admin dashboard."
      />

      {status === "loading" && <LoadingSpinner label="Fetching certificates..." />}
      {status === "error" && (
        <div className="glass-panel p-8 text-center text-ink-muted">Couldn't load certificates right now.</div>
      )}
      {status === "success" && certificates.length === 0 && (
        <div className="glass-panel p-8 text-center text-ink-muted">
          No certificates added yet — this section will fill in as you add them.
        </div>
      )}

      {status === "success" && certificates.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.button
              key={cert._id}
              onClick={() => setSelected(cert)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass-panel group relative overflow-hidden p-5 text-left transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(57,230,200,0.12)]"
            >
              {cert.image ? (
                <div className="relative mb-4 h-32 overflow-hidden rounded-lg bg-surface-panel">
                  <img src={cert.image} alt={cert.title} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                    <ZoomIn className="h-6 w-6 text-white" />
                  </div>
                </div>
              ) : (
                <Award className="mb-3 h-6 w-6 text-accent-amber" />
              )}
              <h3 className="mb-1 font-semibold text-ink-primary">{cert.title}</h3>
              <p className="text-sm text-ink-muted">{cert.issuer}</p>
              <p className="mb-1 font-mono text-xs text-ink-muted/70">{cert.date}</p>
              {cert.credentialLink && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-cyan">
                  View credential <ExternalLink className="h-3 w-3" />
                </span>
              )}
            </motion.button>
          ))}
        </div>
      )}

      <CertificateLightbox certificate={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
