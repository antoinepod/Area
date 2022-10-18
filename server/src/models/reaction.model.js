const mongoose = require("mongoose");

const reactionSchema = mongoose.Schema({
}, { collection: "reactions" });

module.exports = mongoose.model("Reaction", reactionSchema);