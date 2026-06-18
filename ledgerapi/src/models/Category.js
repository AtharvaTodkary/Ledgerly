const { Schema, default: mongoose } = require("mongoose");

const categorySchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    transactionType: {
      type: String,
      enum: ["EXPENSE", "INCOMING"],
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
      default: "#ffc0f1",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Category", categorySchema);
