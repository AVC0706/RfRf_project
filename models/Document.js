const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
    document_id: { type: Number, default: 0 },
    description: { type: String },
    fileLink: { type: String },
    s3_key: { type: String }
}, 
{
    timestamp: true
});

module.exports = mongoose.model("Document", documentSchema);