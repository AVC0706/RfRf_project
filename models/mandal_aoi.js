const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Mandal_aoiSchema = mongoose.Schema({
    mandal_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    aoi_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Mandal_aoi = mongoose.model("mandal_aoi", Mandal_aoiSchema);

module.exports = Mandal_aoi;