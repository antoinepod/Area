const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const middlewareAuth = require('../middlewares/auth');

const passport = require("passport");

const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../controllers/user")

const User = require("../models/user.model");
const jwt = require("jsonwebtoken")


router.post("/login", passport.authenticate('local'), userCtrl.login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
    res.send(req.user)
});
//passport.authenticate("jwt"),
// router.post("/login",  userCtrl.login);
router.post("/signup", userCtrl.signup);
router.post("/refreshToken", userCtrl.refreshToken);
router.post("/logout", userCtrl.verifyUser , userCtrl.logout);
router.get("/me",  passport.authenticate("jwt", { session: false }), userCtrl.userInfo);
// router.get("/isAuthenticated", connectEnsureLogin(), userCtrl.isAuthenticated);

module.exports = router