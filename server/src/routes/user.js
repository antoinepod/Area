const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const middlewareAuth = require('../middlewares/auth');

const passport = require("passport");

const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../controllers/user")

const User = require("../models/user.model");
const jwt = require("jsonwebtoken")


// router.post("/google", userCtrl.googleLogin);
// router.post('/signup', userCtrl.signup);
// router.post("/login", passport.authenticate("local"), userCtrl.login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
    res.send(req.user)
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })
    User.findById(req.user._id).then(
      user => {
        user.refreshToken.push({ refreshToken })
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500
            res.send(err)
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            res.send({ success: true, token })
          }
        })
      },
      err => next(err)
    )
  })
  

  router.post("/signup", (req, res, next) => {
    // Verify that first name is not empty
    if (!req.body.username) {
      res.statusCode = 500
      res.send({
        name: "username",
        message: "The first name is required",
      })
    } else {
      User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
          if (err) {
            res.statusCode = 500
            res.send(err)
          } else {
            const token = getToken({ _id: user._id })
            const refreshToken = getRefreshToken({ _id: user._id })
            user.refreshToken.push({ refreshToken })
            user.save((err, user) => {
              if (err) {
                res.statusCode = 500
                res.send(err)
              } else {
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                res.send({ success: true, token })
              }
            })
          }
        }
      )
    }
  })

  
router.post("/refreshToken", (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies
  
    if (refreshToken) {
      try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const userId = payload._id
        User.findOne({ _id: userId }).then(
          user => {
            if (user) {
              // Find the refresh token against the user record in database
              const tokenIndex = user.refreshToken.findIndex(
                item => item.refreshToken === refreshToken
              )
  
              if (tokenIndex === -1) {
                res.statusCode = 401
                res.send("Unauthorized")
              } else {
                const token = getToken({ _id: userId })
                // If the refresh token exists, then create new one and replace it.
                const newRefreshToken = getRefreshToken({ _id: userId })
                user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                user.save((err, user) => {
                  if (err) {
                    res.statusCode = 500
                    res.send(err)
                  } else {
                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                    res.send({ success: true, token })
                  }
                })
              }
            } else {
              res.statusCode = 401
              res.send("Unauthorized")
            }
          },
          err => next(err)
        )
      } catch (err) {
        res.statusCode = 401
        res.send("Unauthorized")
      }
    } else {
      res.statusCode = 401
      res.send("Unauthorized")
    }
  })

module.exports = router