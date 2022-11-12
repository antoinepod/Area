const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");

const googleStrategy = require("passport-google-oauth20").Strategy;
 const User = require("../models/user.model");
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID || "962351901248-sk5lh8uefrg8d9tjaagp275t7511a0sh.apps.googleusercontent.com",
    clientSecret: process.env.CLIENT_SECRET || "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",
    callbackURL: "http://localhost:8080/api/auth/google/callback",
    // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, username: profile.id, password: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));