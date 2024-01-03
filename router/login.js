const router = require("express").Router();
const passport = require("passport");
const { findPw, resetPw} = require("../middleware/password");
const { validatedPassword } = require("../middleware/checkSignup");
const authorization = require("../middleware/authorization");

router.post("/", authorization.issueToken);

router.get("/google", passport.authenticate("google"));

router.get("/google/callback", passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/failed"
    },
    async function (user, err, res) {
        if(!err) {
            const accessToken = authorization.generateAccessToken({ id: user.id, email: user.email, status: user.status });
            const refreshToken = authorization.generateRefreshToken( { id: user.id, email: user.email, status: user.status });

            res.status(200).send( { accessToken: accessToken, refreshToken: refreshToken });
        }
}));

router.post("/findPw", findPw);

router.post("/resetPw/:accessToken", validatedPassword, resetPw);

module.exports = router;