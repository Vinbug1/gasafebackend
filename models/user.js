const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: {
    type: String,
    defualte: ""
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    defualt: "",
  },
  businessPhone: {
    type: String,
    defualt: "",
  },
  businessEmail: {
    type: String,
    defualt: "",
  },
  address: {
    type: String,
    defualt: "",
  },
  bank: {
    type: String,
    defualt: "",
  },
  service: {
    type: String,
    defualt: "",
  },
  serviceCharge: {
    type: String,
    defualt: "",
  },
  deliveryCharge: {
    type: String,
    defualt: "",
  },
  accountNumber: {
    type: String,
    defualt: "",
  },
  accountName: {
    type: String,
    defualt: "",
  },
  isAdmin: {
      type: String,
      default: false,
  },
  gender: {
    type: String,
    defualt: "",
  },
  cylinderSize: {
    type: Number,
    defualt: "",
  },
  facilityCertificationStatus: {
    type: String,
    default: "",
  },
  leakDetectionSystem: {
    type: String,
    default: "",
  },
  emergencyResponseStatus: {
    type: String,
    default: "",
  },
  staffTraing: {
    type: String,
    default: "",
  },
  riskAssessmentAwarenessStatus: {
    type: String,
    default: "",
  },
  riskControlFramework: {
    type: String,
    default: "",
  },
  hsePolicy: {
    type: String,
    default: "",
  },
  lPGHazardsKnowledge: {
    type: String,
    default: "",
  },
  lPGHandlingProcedure: {
    type: String,
    default: "",
  },
  cylinderManagementKnowledge: {
    type: String,
    default: "",
  },
  hazardousAreaClassification: {
    type: String,
    default: "",
  },
  cylinderCertificationStatus: {
    type: String,
    default: "",
  },
  hoseLineCheck: {
    type: String,
    default: "",
  },
  cylinderSafetyCheck: {
    type: String,
    default: "",
  },
  lpgSafetyKnowledge: {
    type: String,
    default: "",
  },
  educationalQualification: {
    type: String,
    default: '',
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
