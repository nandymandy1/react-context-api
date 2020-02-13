const { Schema, model } = require("mongoose");

const ContactSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    name: {
      index: true,
      type: String,
      required: true
    },
    email: {
      index: true,
      type: String,
      required: true
    },
    phone: {
      index: true,
      type: String
    },
    type: {
      type: String,
      default: "personal",
      enum: ["personal", "professional"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("contacts", ContactSchema);
