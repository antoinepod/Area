const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const middlewareAuth = require('../middlewares/auth');

const passport = require("passport");

const User = require("../models/user.model");
const jwt = require("jsonwebtoken")

router.get("/google",
  passport.authenticate("google", { scope: ['profile'] })
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:8081/login" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    //return a token
    // console.log("req.user", req.user)
    const token = jwt.sign({user: req.user.id}, process.env.JWT_SECRET || "aaaz-zeazebaeazhaz-ehaebaeba");
    // const token = userCtrl.getToken(req.user);
    // const token = req.user.generateJWT();
    // res.json({token: token});
    res.redirect("http://localhost:8081/");
    }
);

router.post("/login", passport.authenticate('local'), userCtrl.login);
router.post("/signup", userCtrl.signup);
// router.get("/logout", userCtrl.verifyUser , userCtrl.logout);
router.get("/me",  passport.authenticate("jwt", { session: false }), userCtrl.userInfo);
router.get("/isAuthenticated", passport.authenticate("jwt", {session: false}), userCtrl.isAuthenticated);

module.exports = router