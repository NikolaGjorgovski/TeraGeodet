const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    userSnapshot: {
      fName: { type: String, required: true },
      lName: { type: String, required: true },
      email: { type: String, required: true },
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    cadastralMunicipality: {
      type: String,
      required: true,
      trim: true,
    },

    parcelNumber: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "reviewing", "in-progress", "completed", "rejected"],
      default: "pending",
    },

    adminNote: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const RequestModel = mongoose.model("requests", RequestSchema);
module.exports = RequestModel;
