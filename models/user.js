const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    mobile: {
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


UserSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

module.exports = mongoose.model("user", UserSchema);