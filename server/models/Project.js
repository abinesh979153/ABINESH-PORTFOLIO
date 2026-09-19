const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: "" }, // URL or path to project image
    technologies: [{ type: String }],
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Frontend", "React", "Full Stack", "Cybersecurity", "Other"],
      default: "Full Stack",
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }, // controls display order, lower shows first

    // Optional extra detail shown in the "View Details" modal — safe to leave blank
    problem: { type: String, default: "" },
    solution: { type: String, default: "" },
    features: [{ type: String }],
    screenshots: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
