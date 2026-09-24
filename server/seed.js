// Run with: npm run seed
require("dotenv").config();

const connectDB = require("./config/db");
const Project = require("./models/Project");
const Certificate = require("./models/Certificate");

const projects = [
  {
    title: "Personal Portfolio",
    description:
      "A modern full stack portfolio website built to showcase my development skills, cybersecurity learning, projects and certifications.",
    image: "",
    technologies: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    githubLink: "https://github.com/abinesh979153/ABINESH-PORTFOLIO",
    liveLink: "",
    category: "Full Stack",
    featured: true,
    order: 1,
    problem:
      "Needed a professional platform to showcase my skills, projects, certifications and technical experience.",
    solution:
      "Built a MERN-based portfolio with a responsive interface, backend API, MongoDB database and admin dashboard.",
    features: [
      "Responsive animated UI",
      "Dynamic projects section",
      "Dynamic certificates section",
      "Admin dashboard",
      "MongoDB-backed content",
      "Contact form",
    ],
    screenshots: [],
  },

  {
    title: "Full Stack Task Manager",
    description:
      "A full stack task management application designed to organize tasks through a responsive dashboard and REST API.",
    image: "",
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
    githubLink: "",
    liveLink: "",
    category: "Full Stack",
    featured: true,
    order: 2,
    problem:
      "Needed a simple way to create, organize, update and track tasks from a single application.",
    solution:
      "Developed a full stack task management system with a React frontend, Express REST API and MongoDB database.",
    features: [
      "Task CRUD operations",
      "Authentication",
      "JWT-based authorization",
      "Task organization",
      "Responsive dashboard",
      "REST API",
    ],
    screenshots: [],
  },

  {
    title: "Student Management System",
    description:
      "A full stack student management application for organizing student records through a clean dashboard interface.",
    image: "",
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
    ],
    githubLink: "",
    liveLink: "",
    category: "React",
    featured: false,
    order: 3,
    problem:
      "Managing student information manually can make records difficult to organize and update.",
    solution:
      "Created a CRUD-based application for maintaining student records through a web dashboard.",
    features: [
      "Student CRUD operations",
      "Dashboard interface",
      "MongoDB database",
      "Mongoose data modeling",
      "Responsive UI",
    ],
    screenshots: [],
  },

  {
    title: "Cybersecurity Learning Lab",
    description:
      "An authorized personal security lab for learning network scanning, web application security and vulnerability assessment fundamentals.",
    image: "",
    technologies: [
      "Nmap",
      "Burp Suite",
      "Linux",
      "Networking",
      "HTTP",
      "Web Security",
    ],
    githubLink: "",
    liveLink: "",
    category: "Cybersecurity",
    featured: false,
    order: 4,
    problem:
      "Needed a controlled environment to practice cybersecurity concepts without affecting unauthorized systems.",
    solution:
      "Built and used a personal lab environment for authorized security testing and cybersecurity learning.",
    features: [
      "Network scanning practice",
      "Web security testing",
      "HTTP request analysis",
      "Linux security lab",
      "Vulnerability assessment fundamentals",
    ],
    screenshots: [],
  },
];
const certificates = [
  {
    title: "Full Stack Developer Certification",
    issuer: "GUVI",
    date: "2026",
    image: "/certificates/HCL GUVI Certification.png",
    credentialLink: "",
    order: 1,
  },
  {
    title: "Full Stack Development Internship",
    issuer: "Internship",
    date: "2026",
    image: "/certificates/full-stack-intership.jpg",
    credentialLink: "",
    order: 2,
  },
  {
    title: "Penetration Testing Certification",
    issuer: "Cybersecurity",
    date: "2026",
    image: "/certificates/pentesting-cyber.jpg",
    credentialLink: "",
    order: 3,
  },
  {
    title: "UI/UX Design Internship",
    issuer: "Internship",
    date: "2026",
    image: "/certificates/ui-ux-design-internship.jpg",
    credentialLink: "",
    order: 4,
  },
  {
    title: "UI/UX Design Certification",
    issuer: "UI/UX Design",
    date: "2026",
    image: "/certificates/ui-ux-design.jpg",
    credentialLink: "",
    order: 5,
  },
  {
    title: "WiFi Penetration Testing",
    issuer: "Cybersecurity",
    date: "2026",
    image: "/certificates/wifi-pentesting.jpg",
    credentialLink: "",
    order: 6,
  },
];

async function seed() {
  try {
    await connectDB();

    await Project.deleteMany();
    await Certificate.deleteMany();

    await Project.insertMany(projects);
    await Certificate.insertMany(certificates);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seed();
