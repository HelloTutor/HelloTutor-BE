const router = require("express").Router();
const userRepository = require("../repository/userRepository");
const { validatedEmail, overlappedEmail, validatedPassword } = require("../middleware/checkSignup");

router.post("/auth/user/tutee",
    validatedEmail, overlappedEmail, validatedPassword,
    async (req, res) => {
        const tutee = req.body;
        const result = await userRepository.insertUser(tutee);

        if (result) {
            res.status(200).json({ message: "회원가입 완료" });
        }
        res.status(500).send();
});

router.post("/auth/user/tutor",
    validatedEmail, overlappedEmail, validatedPassword,
    async (req, res) => {
        const tutor = req.body;
        const result = await userRepository.insertUser(tutor);

        if (result) {
            res.status(200).json({ message: "회원가입 완료" });
        }
});

module.exports = router;