const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const generateToken = (admin) =>
  jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// @desc    Register the admin account (intended to be run once, manually)
// @route   POST /api/auth/register
// @access  Public - but only useful before an admin exists
const registerAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({
        success: false,
        message: "An admin account already exists. Registration is disabled.",
      });
    }

    const admin = await Admin.create({ username, password });
    const token = generateToken(admin);
    res.status(201).json({ success: true, token, username: admin.username });
  } catch (error) {
    next(error);
  }
};

// @desc    Log in as admin
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    const token = generateToken(admin);
    res.json({ success: true, token, username: admin.username });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerAdmin, loginAdmin };
