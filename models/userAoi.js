const mongoose = require("mongoose")

const User_aoiSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    aoi_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    aoi_name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const user_aoi = mongoose.model("user_aoi", User_aoiSchema);

module.exports = user_aoi;