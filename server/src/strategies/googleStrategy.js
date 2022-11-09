const passport = require("passport");

const googleStrategy = require("passport-google-oauth2").Strategy;

passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID || "962351901248-vt8o9io4adohtlihbs3lpdtlichv9kqn.apps.googleusercontent.com",
    clientSecret: process.env.CLIENT_SECRET || "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",
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
