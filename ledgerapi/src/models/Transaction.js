const { Schema, default: mongoose } = require("mongoose");

const transactionSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["EXPENSE", "INCOMING"],
  },
  amount: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  transactionDate: {
    type: Date,
    required: true,
  },
  tags: {
    type: Array,
  },
  attachments: {
    type: String,
  },
},
  {
    timestamps: true,
  },);

module.exports = mongoose.model("Transaction", transactionSchema);
