const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user.model");

//Called during login/sign up.
// passport.use(new LocalStrategy(User.authenticate()))

// passport.use(User.createStrategy());

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());