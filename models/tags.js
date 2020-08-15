const mongoose = require("mongoose");

const TagSchema = mongoose.Schema({
    name: {
        type: String
    },
    mom_ids : [{
        mom_id: mongoose.Schema.Types.ObjectId
    }]
})

const Tag = mongoose.model("tag",TagSchema);

module.exports = Tag;