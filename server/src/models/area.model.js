const mongoose = require("mongoose");

const areaSchema = mongoose.Schema({
}, { collection: "areas" });

module.exports = mongoose.model("Area", areaSchema);