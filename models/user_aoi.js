const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const User_aoiSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    aoi_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const user_aoi = mongoose.model("user_aoi", User_aoiSchema);

module.exports = user_aoi;