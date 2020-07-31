const mongoose = require("mongoose")

const areaofintSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const areaofint = mongoose.model("areaofint", areaofintSchema);

module.exports = areaofint;