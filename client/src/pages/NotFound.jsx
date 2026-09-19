import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-app text-center text-ink-secondary">
      <p className="font-mono text-accent-cyan">404</p>
      <h1 className="text-2xl font-semibold text-ink-primary">Page not found</h1>
      <Link to="/" className="btn-primary mt-4">Back to home</Link>
    </div>
  );
}
