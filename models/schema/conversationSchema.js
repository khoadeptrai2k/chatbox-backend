const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = Schema(
  {
    // recipients: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
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

module.exports = mongoose.model("conversation", ConversationSchema, "conversations");
