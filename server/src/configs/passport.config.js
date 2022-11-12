// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("./userModel");

// module.exports = (passport) => {
//     passport.use(new GoogleStrategy({
//         clientID: "962351901248-vt8o9io4adohtlihbs3lpdtlichv9kqn.apps.googleusercontent.com",
//         clientSecret: "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",
//         callbackURL: "http://localhost:3000/auth/google/callback",
//         passReqToCallback   : true
//       },
//       async (request, accessToken, refreshToken, profile, done) => {
//         try {
//             let existingUser = await User.findOne({ 'google.id': profile.id });
//             // if user exists return the user 
//             if (existingUser) {
//               return done(null, existingUser);
//             }
//             // if user does not exist create a new user 
//             console.log('Creating new user...');
//             const newUser = new User({
//               method: 'google',
//               google: {
//                 id: profile.id,
//                 name: profile.displayName,
//                 email: profile.emails[0].value
//               }
//             });
//             await newUser.save();
//             return done(null, newUser);
//         } catch (error) {
//             return done(error, false)
//         }
//       }
//     ));
// }