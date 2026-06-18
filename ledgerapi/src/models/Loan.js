const { Schema, default: mongoose } = require("mongoose");

const loanSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contactId: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    type: {
      type: String,
      enum: ["LENT", "BORROWED"],
      required: true,
    },
    pricipalAmt: {
      type: Number,
      required: true,
    },
    outStandingAmt: {
      type: Number,
    },
    purpose: {
      type: String,
    },
    loanDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Partial", " Paid", "Overdue"],
      default: "Pending",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Loan", loanSchema);
