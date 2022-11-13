const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const passportLocalMongoose = require("passport-local-mongoose")
const bcrypt = require("bcryptjs");
const findOrCreate = require("mongoose-findorcreate");
const jwt = require("jsonwebtoken");
const SECRET_KEY  = process.env.JWT_SECRET || "aaaz-zeazebaeazhaz-ehaebaeba"

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
  password: { type: String, required: true, default: /*random password*/ "dvssvkjndkjcj" },
  created: { type: Date, default: Date.now },
  areas: [{
    _id: { type: String, require: true, trim: true },
    action: { type: String, required: true, trim: true },
    action_data: { type: String, trim: true },
    last_action: { type: String, required: true, trim: true },
    reaction: { type: String, required: true, trim: true },
    reaction_data: { type: String, trim: true },
    status: { type: Boolean, required: true, trim: true },
    }],
}, { collection: "users" });

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
  const payload = {
    id: this.id,
  };
  const token = jwt.sign(
    payload,
    SECRET_KEY
  );
  return token;
};


userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
