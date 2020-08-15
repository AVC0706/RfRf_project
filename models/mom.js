const mongoose = require("mongoose");

const MomSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    mandal_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    mom_meeting: {
        type: String
    }
});

const Mom = mongoose.model("mom", MomSchema);

module.exports = Mom;