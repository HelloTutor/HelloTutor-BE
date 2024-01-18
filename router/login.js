const router = require("express").Router();
const passport = require("passport");
const { sendMail, resetPw } = require("../middleware/password");
const { validatedPassword } = require("../middleware/checkSignup");
const authorization = require("../middleware/authorization");

router.post("/", authorization.issueToken);

router.get("/google", passport.authenticate("google"));

router.get("/google/callback",passport.authenticate("google", {
    successReturnToOrRedirect: "/auth/login/google/callback/success",
    failureRedirect: "/auth/login/google/callback/failed"
    })
);

router.get("/google/callback/:result", (req, res) => {
    const { params, user } = req;

    if (params.result === "success" && user) {
        const { id, email } = user;
        const accessToken = authorization.generateAccessToken({ id, email });
        const refreshToken = authorization.generateRefreshToken({ id, email });

        console.log(accessToken, refreshToken);
        const { FRONT_HOST } = process.env;

        if (FRONT_HOST) {
            res.header("Content-Type", "text/html");

            return res.send(`
                <!DOCTYPE html>
                <html lang="ko">
                <head>
                <title>redirect</title>
                <script>
                    // 프론트에 전송할 토큰을 여기에 정의합니다.
                    window.opener?.postMessage('${JSON.stringify({
                        accessToken,
                        refreshToken,
                    })}','${FRONT_HOST}');
                    setTimeout(window.close,200);
                </script>
                </head>
                </html>
            `);
        }
        return res.json({ accessToken, refreshToken });
    }
    res.status(500).json({ message: "invalid server error" });
});

router.post("/findPw", sendMail);

router.post("/resetPw/:accessToken", validatedPassword, resetPw);

module.exports = router;
