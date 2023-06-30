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
  // isAdmin: {
  //     type: Boolean,
  //     default: false,
  // },
  gender: {
    type: String,
    required: true,
  },
  cylinderSize: {
    type: Number,
    required: true
  },
  facilityCertificationStatus: {
    type: Boolean,
    default: false,
  },
  leakDetectionSystem: {
    type: Boolean,
    default: false,
  },
  emergencyResponseStatus: {
    type: Boolean,
    default: false,
  },
  staffTraing: {
    type: Boolean,
    default: false,
  },
  riskAssessmentAwarenessStatus: {
    type: Boolean,
    default: false,
  },
  riskControlFramework: {
    type: Boolean,
    default: false,
  },
  hsePolicy: {
    type: Boolean,
    default: false,
  },
  lPGHazardsKnowledge: {
    type: Boolean,
    default: false,
  },
  lPGHandlingProcedure: {
    type: Boolean,
    default: false,
  },
  cylinderManagementKnowledge: {
    type: Boolean,
    default: false,
  },
  hazardousAreaClassification: {
    type: Boolean,
    default: false,
  },
  cylinderCertificationStatus: {
    type: Boolean,
    default: false,
  },
  hoseLineCheck: {
    type: Boolean,
    default: false,
  },
  cylinderSafetyCheck: {
    type: Boolean,
    default: false,
  },
  lpgSafetyKnowledge: {
    type: Boolean,
    default: false,
  },
  educationalQualification: {
    type: String,
    required: true,
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
