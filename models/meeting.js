const mongoose = require("mongoose");

const MeetingSchema = mongoose.Schema({
    mandal_id: {
        type: mongoose.Schema.Types.ObjectId
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
    mom_tags: [String],
    pdf_link: {
        type: String
    }
})

const Meeting = mongoose.model("meeting",MeetingSchema);
module.exports = Meeting;