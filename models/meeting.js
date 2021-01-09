const mongoose = require("mongoose");
const MandalSchema = require("./mandal")
const MeetingSchema = mongoose.Schema({
    mandal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MandalSchema',
    },
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    mom: {
        type: String
    },
    agenda: {
        type: String
    },
    meeting_url: {
        type: String
    },
    tags: [String],
})

const Meeting = mongoose.model("meeting", MeetingSchema);
module.exports = Meeting;