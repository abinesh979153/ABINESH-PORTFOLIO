const Message = require("../models/Message");

// Very small validation helper - keeps the controller readable
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// @desc    Save a contact form submission
// @route   POST /api/contact
// @access  Public
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address" });
    }
    if (message.length > 5000) {
      return res.status(400).json({ success: false, message: "Message is too long" });
    }

    await Message.create({ name, email, subject, message });

    res.status(201).json({ success: true, message: "Your message has been sent successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (newest first)
// @route   GET /api/contact
// @access  Private (admin)
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a message as read
// @route   PUT /api/contact/:id/read
// @access  Private (admin)
const markAsRead = async (req, res, next) => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Message not found" });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private (admin)
const deleteMessage = async (req, res, next) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Message not found" });
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getMessages, markAsRead, deleteMessage };
