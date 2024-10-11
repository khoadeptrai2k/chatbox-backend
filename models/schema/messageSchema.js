const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = Schema(
  {
    conversation: { type: mongoose.Types.ObjectId, ref: "conversation" },
    // sender: { type: mongoose.Types.ObjectId, ref: "user" },
    // recipient: { type: mongoose.Types.ObjectId, ref: "user" },
    type: {
      type: String,
      enum: ["user", "system"],
    },
    text: String,
    media: Array,
    thirdParty: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", MessageSchema, "messages");
