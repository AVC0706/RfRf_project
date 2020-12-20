const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({
    name: {
        type: String
    },
    author: {
        type: String
    },
    signedRequest: {
        type: String
    },
    url: {
        type: String
    }
})

const Publication = mongoose.model("publication", PublicationSchema);

module.exports = Publication;
