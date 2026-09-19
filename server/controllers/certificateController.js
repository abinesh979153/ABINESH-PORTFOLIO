const Certificate = require("../models/Certificate");

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private (admin)
const createCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private (admin)
const updateCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }
    res.json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private (admin)
const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }
    res.json({ success: true, message: "Certificate deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
