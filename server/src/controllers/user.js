const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
// const SECRET_KEY = require("../configs/auth.config").SECRET_KEY;
const SECRET_KEY  = process.env.JWT_SECRET || "aaaz-zeazebaeazhaz-ehaebaeba"
const middlewareAuth = require("../middlewares/auth");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt

const dev = process.env.NODE_ENV !== "production";


const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: process.env.SESSION_EXPIRY,
  sameSite: "none",
};

const getToken = (user) => {
  return jwt.sign({id: user.id}, process.env.JWT_SECRET || "aaaz-zeazebaeazhaz-ehaebaeba", {
    expiresIn: 86400 // 24 hours,
  });
}; 


const logout = (req, res, next) => {
  req.logout((err)=> {
    if (err) {
      res.status(400).send(err);
    } else {
      // res.redirect("/login")
      res.status(200).send("Logged out");
      // res.redirect("/login");
    }
  })
};

const isAuthenticated = (req, res, next) => {
  res.status(200).json({ auth: true });
};


const login = (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "User not found !" });
    }
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Incorrect password !" });
        }
        const payload = {
          id: user.id,
        };
        res.status(200).json({
          success: true,
          auth: true,
          username: user.username,
          userId: user._id,
          
          token: jwt.sign(
            payload,
            SECRET_KEY
          ),
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

const userInfo = (req, res, next) => {
  // const token = req.body.token;
  const rawToken =  req.headers['authorization']; // Express headers are auto converted to lowercase
  const token  =rawToken.split(' ')[1];
  // res.send(token);
  const decoded = jwt.verify(token, SECRET_KEY);
  User.findById(decoded.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found !" });
      } else {
        const {password, ...data} = user._doc;
        return res.status(200).json(data);
      }
    })
};
    

const signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User created !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

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

//export modules
module.exports = {
  COOKIE_OPTIONS,
  getToken,
  login,
  isAuthenticated,
  signup,
  userInfo,
  logout,
};