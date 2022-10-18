const mongoose = require("mongoose");

const actionSchema = mongoose.Schema({
}, { collection: "actions" });

module.exports = mongoose.model("Action", actionSchema);