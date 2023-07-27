const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  color: {
    type: String,
    required: [true, "DB: color is required"],
  },
  model: {
    type: String,
    required: [true, "DB: model is required"],
  },
  year: {
    type: Number,
    default: 2000,
  },
  transmission: {
    type: String,
    enum: ["auto", "manual"],
  },
});

module.exports = model("car", carSchema);
