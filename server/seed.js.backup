// Run with: npm run seed
// Populates the database with placeholder projects and certificates so the
// site has content to display immediately after setup. Replace freely via
// the admin dashboard once you have your real project/certificate details.
require("dotenv").config();
const connectDB = require("./config/db");
const Project = require("./models/Project");
const Certificate = require("./models/Certificate");

const projects = [
  {
    title: "Personal Portfolio",
    description:
      "This very portfolio website, built to showcase my skills, projects and certificates with a modern animated UI.",
    image: "",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB"],
    githubLink: "", // add your real repo URL — button stays hidden until you do
    liveLink: "",
    category: "Full Stack",
    featured: true,
    order: 1,
    problem: "Needed a single place to showcase full stack and cybersecurity work to recruiters.",
    solution: "Built a MERN portfolio with an admin dashboard so projects/certificates can be updated without redeploying code.",
    features: ["Animated, responsive UI", "Admin dashboard for content", "Contact form backed by MongoDB"],
    screenshots: [],
  },
  {
    title: "Full Stack Task Manager",
    description:
      "A task management app with authentication, drag-and-drop task boards, and a REST API for creating, updating and tracking tasks.",
    image: "",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    githubLink: "",
    liveLink: "",
    category: "Full Stack",
    featured: false,
    order: 2,
    problem: "",
    solution: "",
    features: [],
    screenshots: [],
  },
  {
    title: "Student Management System",
    description:
      "A CRUD application for managing student records, attendance and grades, built with a clean dashboard interface.",
    image: "",
    technologies: ["React", "Express", "MongoDB", "Mongoose"],
    githubLink: "",
    liveLink: "",
    category: "React",
    featured: false,
    order: 3,
    problem: "",
    solution: "",
    features: [],
    screenshots: [],
  },
  {
    title: "Cybersecurity Learning Lab",
    description:
      "A personal lab environment used to practice network scanning, vulnerability assessment basics, and web application security fundamentals.",
    image: "",
    technologies: ["Nmap", "Burp Suite", "Linux", "Networking Basics"],
    githubLink: "",
    liveLink: "",
    category: "Cybersecurity",
    featured: false,
    order: 4,
    problem: "",
    solution: "",
    features: [],
    screenshots: [],
  },
];

const certificates = [
  {
    title: "Add your certificate title",
    issuer: "Add issuing organization",
    date: "2025",
    image: "", // e.g. "/certificates/certificate-1.jpg" after adding the file to client/public/certificates/
    credentialLink: "",
    order: 1,
  },
];

const seed = async () => {
  await connectDB();
  await Project.deleteMany();
  await Certificate.deleteMany();
  await Project.insertMany(projects);
  await Certificate.insertMany(certificates);
  console.log("Database seeded with placeholder projects and certificates");
  process.exit();
};

seed();
