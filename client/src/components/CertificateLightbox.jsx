import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

// Full-size preview overlay for a certificate image, with an optional
// credential link. Closes on backdrop click, close button, or Escape.
export default function CertificateLightbox({ certificate, onClose }) {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${certificate.title} preview`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel max-h-[90vh] w-full max-w-3xl overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-surface-border px-5 py-3">
            <div>
              <p className="text-sm font-semibold text-ink-primary">{certificate.title}</p>
              <p className="text-xs text-ink-muted">{certificate.issuer} · {certificate.date}</p>
            </div>
            <button onClick={onClose} aria-label="Close" className="text-ink-muted hover:text-accent-cyan">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex max-h-[70vh] items-center justify-center overflow-auto bg-black/20 p-4">
            {certificate.image ? (
              <img src={certificate.image} alt={certificate.title} className="max-h-full w-auto rounded-lg object-contain" />
            ) : (
              <p className="p-10 text-sm text-ink-muted">No image added yet.</p>
            )}
          </div>

          {certificate.credentialLink && (
            <div className="border-t border-surface-border p-4">
              <a
                href={certificate.credentialLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:underline"
              >
                View credential <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
