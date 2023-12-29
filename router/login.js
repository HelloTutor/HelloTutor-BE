const router = require("express").Router();
const passport = require("passport");
const { issueToken } = require("../middleware/authorization");

router.post("/", issueToken);

router.get("/google", passport.authenticate("google", { scope: ["profile, email"] }));

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "auth/login" }),
    (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
});

module.exports = router;