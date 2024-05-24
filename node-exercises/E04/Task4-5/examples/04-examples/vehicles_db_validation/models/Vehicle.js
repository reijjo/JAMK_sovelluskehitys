const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    maxLength: 10,
  },
  model: String,
  type: {
    type: String,
    required: true,
  },
  license_plate: {
    type: String,
    required: [true, "License plate required!"],
    validate: {
      validator: function (v) {
        return /^[A-Z]{3} - \d{3}$/.test(v);
      },
      message: (props) => `${props.value} is invalid plate!`,
    },
  },
  mileage: {
    type: Number,
    value: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
});

vehicleSchema.pre("check", function (next) {
  const vehicle = this;
  if (vehicle.status === "inactive") {
    if (!vehicle.mileage) {
      return next(new Error("Mileage cannot be null"));
    }
    console.log("Vehicle mileage", vehicle.mileage);
  }
  next();
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
