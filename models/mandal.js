const mongoose = require("mongoose");


const MandalSchema = new mongoose.Schema({
    mandal_name: String,
    leader_id: String,
    leader_name: String,
    city: String,
    district: String,
    state: String,
    country: String,
    member_count: Number,
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
    }
});

const Mandal = mongoose.model('Mandal', MandalSchema);
module.export = Mandal