import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2, Pencil, Plus, Mail } from "lucide-react";
import {
  getProjects, createProject, updateProject, deleteProject,
  getCertificates, createCertificate, updateCertificate, deleteCertificate,
  getMessages, deleteMessage,
} from "../services/api";

const PROJECT_CATEGORIES = ["Frontend", "React", "Full Stack", "Cybersecurity", "Other"];

const emptyProject = {
  title: "", description: "", image: "", technologies: "", githubLink: "", liveLink: "",
  category: "Full Stack", problem: "", solution: "", features: "", screenshots: "",
};
const emptyCertificate = { title: "", issuer: "", date: "", image: "", credentialLink: "" };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("projects");

  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);

  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [certForm, setCertForm] = useState(emptyCertificate);
  const [editingCertId, setEditingCertId] = useState(null);

  const [feedback, setFeedback] = useState("");

  const loadAll = () => {
    getProjects().then((res) => setProjects(res.data.data || []));
    getCertificates().then((res) => setCertificates(res.data.data || []));
    getMessages()
      .then((res) => setMessages(res.data.data || []))
      .catch(() => setMessages([]));
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ---- Projects ----
  const submitProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      technologies: projectForm.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      features: projectForm.features.split(",").map((t) => t.trim()).filter(Boolean),
      screenshots: projectForm.screenshots.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, payload);
        setFeedback("Project updated");
      } else {
        await createProject(payload);
        setFeedback("Project created");
      }
      setProjectForm(emptyProject);
      setEditingProjectId(null);
      loadAll();
    } catch (err) {
      setFeedback(err.response?.data?.message || "Error saving project");
    }
  };

  const editProject = (p) => {
    setEditingProjectId(p._id);
    setProjectForm({
      ...emptyProject,
      ...p,
      technologies: (p.technologies || []).join(", "),
      features: (p.features || []).join(", "),
      screenshots: (p.screenshots || []).join(", "),
    });
  };

  const removeProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    loadAll();
  };

  // ---- Certificates ----
  const submitCert = async (e) => {
    e.preventDefault();
    try {
      if (editingCertId) {
        await updateCertificate(editingCertId, certForm);
        setFeedback("Certificate updated");
      } else {
        await createCertificate(certForm);
        setFeedback("Certificate created");
      }
      setCertForm(emptyCertificate);
      setEditingCertId(null);
      loadAll();
    } catch (err) {
      setFeedback(err.response?.data?.message || "Error saving certificate");
    }
  };

  const editCert = (c) => {
    setEditingCertId(c._id);
    setCertForm({ ...emptyCertificate, ...c });
  };

  const removeCert = async (id) => {
    if (!confirm("Delete this certificate?")) return;
    await deleteCertificate(id);
    loadAll();
  };

  const removeMessage = async (id) => {
    if (!confirm("Delete this message?")) return;
    await deleteMessage(id);
    loadAll();
  };

  return (
    <div className="min-h-screen bg-surface-app px-6 py-10 text-ink-secondary sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-ink-primary">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-secondary !px-4 !py-2 text-xs">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <div className="mb-8 flex gap-2">
          {["projects", "certificates", "messages"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium capitalize ${
                tab === t ? "border-accent-cyan text-accent-cyan" : "border-surface-border text-ink-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {feedback && <p className="mb-6 text-sm text-accent-cyan">{feedback}</p>}

        {tab === "projects" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <form onSubmit={submitProject} className="glass-panel space-y-4 p-6">
              <h2 className="font-semibold text-ink-primary">{editingProjectId ? "Edit Project" : "Add Project"}</h2>
              {["title", "image", "githubLink", "liveLink"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  className="field-input"
                  value={projectForm[field]}
                  onChange={(e) => setProjectForm({ ...projectForm, [field]: e.target.value })}
                />
              ))}
              <select
                className="field-input"
                value={projectForm.category}
                onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
              >
                {PROJECT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <textarea
                placeholder="description"
                className="field-input"
                rows={3}
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              />
              <input
                placeholder="technologies (comma separated)"
                className="field-input"
                value={projectForm.technologies}
                onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
              />
              <textarea
                placeholder="problem (optional, shown in View Details)"
                className="field-input"
                rows={2}
                value={projectForm.problem}
                onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
              />
              <textarea
                placeholder="solution (optional, shown in View Details)"
                className="field-input"
                rows={2}
                value={projectForm.solution}
                onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
              />
              <input
                placeholder="features (comma separated, optional)"
                className="field-input"
                value={projectForm.features}
                onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
              />
              <input
                placeholder="screenshot URLs (comma separated, optional)"
                className="field-input"
                value={projectForm.screenshots}
                onChange={(e) => setProjectForm({ ...projectForm, screenshots: e.target.value })}
              />
              <button type="submit" className="btn-primary w-full">
                <Plus className="h-4 w-4" /> {editingProjectId ? "Update" : "Create"}
              </button>
            </form>

            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p._id} className="glass-panel flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-ink-primary">{p.title}</p>
                    <p className="text-xs text-ink-muted">{p.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editProject(p)} className="text-ink-muted hover:text-accent-cyan"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => removeProject(p._id)} className="text-ink-muted hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "certificates" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <form onSubmit={submitCert} className="glass-panel space-y-4 p-6">
              <h2 className="font-semibold text-ink-primary">{editingCertId ? "Edit Certificate" : "Add Certificate"}</h2>
              <p className="text-xs text-ink-muted">
                Place image files in <code className="text-accent-cyan">client/public/certificates/</code> then reference
                them here as <code className="text-accent-cyan">/certificates/your-file.jpg</code>.
              </p>
              {["title", "issuer", "date", "image", "credentialLink"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  className="field-input"
                  value={certForm[field]}
                  onChange={(e) => setCertForm({ ...certForm, [field]: e.target.value })}
                />
              ))}
              <button type="submit" className="btn-primary w-full">
                <Plus className="h-4 w-4" /> {editingCertId ? "Update" : "Create"}
              </button>
            </form>

            <div className="space-y-3">
              {certificates.map((c) => (
                <div key={c._id} className="glass-panel flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-ink-primary">{c.title}</p>
                    <p className="text-xs text-ink-muted">{c.issuer} · {c.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editCert(c)} className="text-ink-muted hover:text-accent-cyan"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => removeCert(c._id)} className="text-ink-muted hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-3">
            {messages.length === 0 && <p className="text-ink-muted">No messages yet.</p>}
            {messages.map((m) => (
              <div key={m._id} className="glass-panel p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink-primary">
                    <Mail className="h-4 w-4 text-accent-cyan" /> {m.name} <span className="text-xs text-ink-muted">({m.email})</span>
                  </div>
                  <button onClick={() => removeMessage(m._id)} className="text-ink-muted hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </div>
                <p className="text-sm font-medium text-ink-secondary">{m.subject}</p>
                <p className="text-sm text-ink-muted">{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
