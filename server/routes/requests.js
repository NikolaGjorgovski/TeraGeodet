const express = require("express");
const router = express.Router();
const RequestModel = require("../models/Request");
const { protect, adminOnly } = require("../middleware/auth");
const { sendNewRequestEmail } = require("../utils/mailer");

// ─── POST /requests ───────────────────────────────────────────────────────────
router.post("/", protect, async (req, res) => {
  try {
    const {
      phoneNumber,
      cadastralMunicipality,
      parcelNumber,
      title,
      description,
    } = req.body;

    if (
      !phoneNumber ||
      !cadastralMunicipality ||
      !parcelNumber ||
      !title ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newRequest = await RequestModel.create({
      user: req.user.id,
      userSnapshot: {
        fName: req.user.fName,
        lName: req.user.lName,
        email: req.user.email,
      },
      phoneNumber,
      cadastralMunicipality,
      parcelNumber,
      title,
      description,
    });

    // Send email notification to admin
    // We use try/catch separately so a mail failure doesn't fail the whole request
    // Fire and forget — don't wait for the email to send
    sendNewRequestEmail(newRequest)
      .then(() => console.log("Admin notification email sent."))
      .catch((mailErr) =>
        console.log("Email failed but request was saved:", mailErr.message),
      );

    res.status(201).json({
      message: "Request submitted successfully.",
      request: newRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// ─── GET /requests/mine ───────────────────────────────────────────────────────
router.get("/mine", protect, async (req, res) => {
  try {
    const requests = await RequestModel.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({ requests });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// ─── GET /requests/all ───────────────────────────────────────────────────────
router.get("/all", protect, adminOnly, async (req, res) => {
  try {
    const requests = await RequestModel.find().sort({ createdAt: -1 });

    res.json({ requests });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// ─── PATCH /requests/:id/status ──────────────────────────────────────────────
router.patch("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    const allowedStatuses = [
      "pending",
      "reviewing",
      "in-progress",
      "completed",
      "rejected",
    ];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const updatedRequest = await RequestModel.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNote: adminNote || "",
      },
      { new: true },
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found." });
    }

    res.json({
      message: "Status updated successfully.",
      request: updatedRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

module.exports = router;
