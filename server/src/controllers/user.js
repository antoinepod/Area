const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../configs/auth.config").SECRET_KEY;
const middlewareAuth = require("../middlewares/auth");
const passport = require("passport");

const dev = process.env.NODE_ENV !== "production";

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);


exports.COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: process.env.SESSION_EXPIRY,
  sameSite: "none",
};

exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
};

exports.getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};

exports.verifyUser = passport.authenticate("jwt", { session: false })

// exports.signup = (req, res, next) => {
// bcrypt
//   .hash(req.body.password, 10)
//   .then((hash) => {
//       const user = new User({
//         username: req.body.username,
//         password: hash,
//       });
// user
//   .save()
//   .then(() => res.status(201).json({ message: "User created !" }))
//   .catch((error) => res.status(400).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// exports.signup = (req, res, next) => {
//   if (!req.body.username) {
//     res.statusCode = 500;
//     res.send({
//       name: "ValidationError",
//       message: "Username is required",
//     });
//   } else {
//     User.register(
//       // bcrypt.hash(req.body.password, 10).then((hash) => {
//       new User({ username: req.body.username }),
//       req.body.password,
//       (err, user) => {
//         if (err) {
//           res.status(500).json({ err: err });
//         } else {
//           const token = getToken({ _id: user._id });
//           const refreshToken = getRefreshToken({ _id: user._id });
//           user.refreshToken.push({ refreshToken });
//           user
//             .save()
//             .then(() => {
//               res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
//               // res
//               //   .status(201)
//               //   .json({ message: "User created !", token, refreshToken })
//               //   .cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
//             })
//             .catch((error) => res.status(400).json({ error }));
//         }
//       }
//     );
//   }
//   // })
//   // .catch((error) => res.status(500).json({ error }));
// };

// exports.login = (req, res) => {
//   User.findOne({ username: req.body.username }).then((user) => {
//     if (!user) {
//       return res.status(401).json({ error: "User not found !" });
//     }
//     bcrypt
//       .compare(req.body.password, user.password)
//       .then((valid) => {
//         if (!valid) {
//           return res.status(401).json({ error: "Incorrect password !" });
//         }
//         res.status(200).json({
//           auth: true,
//           userId: user._id,
//           token: jwt.sign(
//             { userId: user._id, username: user.username },
//             SECRET_KEY,
//             {
//               expiresIn: 60,
//             }
//           ),
//         });
//       })
//       .catch((error) => res.status(500).json({ error }));
//   });
// };

// exports.login = (req, res) => {
//   const token = getToken({ _id: req.user._id })
//   const refreshToken = getRefreshToken({ _id: req.user._id })
//   User.findById(req.user._id).then(
//     user => {
//       user.refreshToken.push({ refreshToken })
//       user.save((err, user) => {
//         if (err) {
//           res.statusCode = 500
//           res.send(err)
//         } else {
//           res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
//           res.send({ success: true, token })
//         }
//       })
//     },
//     err => next(err)
//   )
// }

exports.googleLogin = async (req, res) => {
  const token = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  const user = await db.user.upsert({
    where: { email: email },
    update: { name, picture },
    create: { name, email, picture },
  });
  res.status(201);
  res.json(user);
};

exports.register = (req, res) => {
  (req, res) => {
    if (error) return res.status(404).json({ error: "Unauthorized" });
    return res.status(200).json({ auth: true, user: req.user });
  };
};
