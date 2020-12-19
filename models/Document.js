const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
    signedRequest: {
        type: String
    },
    url: {
        type: String
    },
    meeting_id: {
        type: mongoose.Schema.Types.ObjectId,
    }
})

const Document = mongoose.model("document", DocumentSchema);

module.exports = Document;
