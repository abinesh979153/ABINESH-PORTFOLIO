import axios from "axios";

// The API base URL is read from an environment variable so it can be
// different in development (local backend) and production (deployed backend).
// Set VITE_API_URL in a .env file at the client root, e.g.:
//   VITE_API_URL=http://localhost:5000/api        (development)
//   VITE_API_URL=https://your-backend.onrender.com/api   (production)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach the admin token automatically if one is stored (used by the admin dashboard)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProjects = () => api.get("/projects");
export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getCertificates = () => api.get("/certificates");
export const createCertificate = (data) => api.post("/certificates", data);
export const updateCertificate = (id, data) => api.put(`/certificates/${id}`, data);
export const deleteCertificate = (id) => api.delete(`/certificates/${id}`);

export const sendContactMessage = (data) => api.post("/contact", data);
export const getMessages = () => api.get("/contact");
export const markMessageRead = (id) => api.put(`/contact/${id}/read`);
export const deleteMessage = (id) => api.delete(`/contact/${id}`);

export const adminLogin = (data) => api.post("/auth/login", data);
export const adminRegister = (data) => api.post("/auth/register", data);

export default api;
