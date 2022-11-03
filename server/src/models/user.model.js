const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// const AreaModel = require("./area.model"); 
// const AreaSchema = mongoose.model('Area', AreaModel);

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  areas: [{
    _id: { type: String, require: true, trim: true },
    action: { type: String, required: true, trim: true },
    reaction: { type: String, required: true, trim: true },
    status: { type: Boolean, required: true, trim: true },
    }],
}, { collection: "users" });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
