const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

const MemberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,

  },
  mandal_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});



module.exports = mongoose.model("member", MemberSchema);