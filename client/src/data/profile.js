// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for personal info, contact details and social links.
// Every component reads from here — change it once, it updates everywhere.
// Leave a value as "" to automatically hide the button/section that uses it.
// ---------------------------------------------------------------------------
export const profile = {
  name: "Abinesh",
  roleLine1: "Full Stack Developer",
  roleLine2: "& Cybersecurity Enthusiast",
  roles: ["Full Stack Developer & Cybersecurity Enthusiast"],
  department: "B.E. Computer Science and Engineering",
  college: "Mahalakshmi Tech Campus",
  intro:
    "I build full stack web applications with the MERN stack and explore cybersecurity and penetration testing on the side. I'm interested in how systems are built, and equally interested in how they can be broken — which helps me build things that hold up.",
  careerInterests: ["Full Stack Development", "Web Development", "Cybersecurity", "Penetration Testing"],

  // Contact — leave blank to hide the related button
  email: "your.email@example.com",
  phone: "", // e.g. "+91 90000 00000" — leave blank to hide the phone button
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  resumeUrl: "/resume.pdf",
  location: "Tamil Nadu, India",

  // Used by the GitHub repositories section (client-side fetch, no token needed)
  githubUsername: "your-username",
};

export const aboutCards = [
  {
    title: "Full Stack Developer",
    description: "Building complete web applications end to end with the MERN stack.",
  },
  {
    title: "Cybersecurity Enthusiast",
    description: "Learning how applications get attacked, and how to defend them.",
  },
  {
    title: "Problem Solver",
    description: "Breaking problems into small, logical steps and debugging systematically.",
  },
  {
    title: "Continuous Learner",
    description: "Picking up new frameworks, tools and security concepts as I go.",
  },
];

export const education = [
  {
    degree: "B.E. Computer Science and Engineering",
    institution: "Mahalakshmi Tech Campus",
    period: "2023 — 2027",
    description: "Coursework covering data structures, web development, databases, and computer networks.",
  },
];
