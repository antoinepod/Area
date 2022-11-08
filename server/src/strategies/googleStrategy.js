const passport = require("passport");

const googleStrategy = require("passport-google-oauth2").Strategy;

passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8081/login",
    // callbackURL: "http://localhost:8080/api/auth/google/callback",
    passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));
