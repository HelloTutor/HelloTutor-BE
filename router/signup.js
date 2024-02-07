const router = require("express").Router();
const userRepository = require("../repository/userRepository");
const { validatedEmail, validatedPassword } = require("../middleware/checkSignup");
const token = require("../middleware/token");

router.post("/tutee",
    validatedEmail, validatedPassword,
    async (req, res) => {
        const { body } = req;
        const result = await userRepository.insertUser(body);

        if (result) {
            res.status(200).json({ message: "회원가입 완료" });
        } else {
            res.status(500).json({ message: "에러발생" });
        }
});

router.post("/tutor",
    validatedEmail, validatedPassword,
    async (req, res) => {
        const { body } = req;
        const result = await userRepository.insertUser(body);

        if (result) {
            res.status(200).json({ message: "회원가입 완료" });
        } else {
            res.status(500).json({ message: "에러발생" });
        }
});

router.post("/reissueToken", token.reIssueToken);

module.exports = router;