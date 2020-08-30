const mongoose = require("mongoose");

const MandalSchema = new mongoose.Schema({
  name: {
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
  aoi: [String],
  

});

module.exports = mongoose.model("Mandal", MandalSchema);
