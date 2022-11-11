const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const passportLocalMongoose = require("passport-local-mongoose")
const bcrypt = require("bcryptjs");

const sessionSchema = mongoose.Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const requestSchema = mongoose.Schema({
  request: {
    type: String,
    default: "",
  },
})


const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  // password: { type: String, required: true },
  refreshToken: {
    type: [sessionSchema],
  },
  request: {
    type: [requestSchema],
  },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  areas: [{
    _id: { type: String, require: true, trim: true },
    action: { type: String, required: true, trim: true },
    reaction: { type: String, required: true, trim: true },
    status: { type: Boolean, required: true, trim: true },
    }],
}, { collection: "users" });

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

userSchema.plugin(passportLocalMongoose)

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
