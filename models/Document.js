const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
    document_id: { type: Number, default: 0 },
    fileLink: { type: String },
    s3_key: { type: String },
    meeting_id: {
        type: mongoose.Schema.Types.ObjectId
    }
}, 
{
    timestamp: true
});
documentSchema.plugin(AutoIncrement, { inc_field: "document_id" });
module.exports = mongoose.model("Document", documentSchema);