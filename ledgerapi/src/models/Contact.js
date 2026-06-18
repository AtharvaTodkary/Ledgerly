const { Schema, default: mongoose } = require("mongoose");

const contactSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  notes: {
    type: String,
  },
},
  {
    timestamps: true,
  },);

module.exports = mongoose.model("Contact", contactSchema);
