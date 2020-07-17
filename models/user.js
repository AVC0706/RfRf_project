const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
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
    qualification: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("user", UserSchema);