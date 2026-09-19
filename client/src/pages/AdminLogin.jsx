import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, AlertCircle } from "lucide-react";
import { adminLogin } from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await adminLogin(form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-app px-6">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass-panel w-full max-w-sm space-y-5 p-8"
      >
        <h1 className="text-xl font-semibold text-ink-primary">Admin Login</h1>
        <div>
          <label className="field-label">Username</label>
          <input
            className="field-input"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="field-label">Password</label>
          <input
            type="password"
            className="field-input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          <LogIn className="h-4 w-4" /> {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-xs text-ink-muted">
          No admin account yet? Create one with a POST request to <code>/api/auth/register</code> (works only once).
        </p>
      </motion.form>
    </div>
  );
}
