const mongoose = require("mongoose");

const MandalSchema = new mongoose.Schema({
  mandal_name: {
    type: String,
  },
  leader_id: {
    type: String,
  },
  leader_name: {
    type: String,
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  member_count: {
    type: Number,
  },
  cityApproved: {
    type: Boolean,
    default: false,
  },
  districtApproved: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Mandal = mongoose.model("Mandal", MandalSchema);
module.export = Mandal;
