const router = require("express").Router();
const passport = require("passport");
const { findPw, resetPw} = require("../middleware/password");
const { validatedPassword } = require("../middleware/checkSignup");
const authorization = require("../middleware/authorization");

router.post("/", authorization.issueToken);

router.get("/google", passport.authenticate("google"));

router.get("/google/callback", passport.authenticate("google", {
    successReturnToOrRedirect: "/auth/login/google/callback/success",
    failureRedirect: "/auth/login/google/callback/success"
    }
));

router.post("/findPw", findPw);

router.post("/resetPw/:accessToken", validatedPassword, resetPw);

module.exports = router;