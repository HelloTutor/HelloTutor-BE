const router = require("express").Router();
const passport = require("passport");
const { issueToken } = require("../middleware/authorization");

router.post("/", issueToken);

router.get("/google", passport.authenticate("google"));

router.get("/google/callback", passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/failed"
}));


module.exports = router;