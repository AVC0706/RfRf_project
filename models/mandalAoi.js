const mongoose = require("mongoose");

const Mandal_aoiSchema = mongoose.Schema({
    mandal_id: {
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

const Mandal_aoi = mongoose.model("mandal_aoi", Mandal_aoiSchema);

module.exports = Mandal_aoi;