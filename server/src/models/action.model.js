const mongoose = require("mongoose");

const actionSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    data: { type: Object, required: true },
}, { collection: "actions" });

module.exports = mongoose.model("Action", actionSchema);
