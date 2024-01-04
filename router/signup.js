const router = require("express").Router();
const userRepository = require("../repository/userRepository");
const { validatedEmail, validatedPassword } = require("../middleware/checkSignup");

router.post("/tutee",
    validatedEmail, validatedPassword,
    async (req, res) => {
        const { body } = req;
        const result = await userRepository.insertUser(body);

        if (result) {
            res.status(200).json({ message: "회원가입 완료" });
        }
        res.status(500).send();
});

router.post("/tutor",
    validatedEmail, validatedPassword,
    async (req, res) => {
        const tutor = req.body;
        const result = await userRepository.insertUser(tutor);

        if (result) {
            res.status(200).json({ message: "회원가입 완료" });
        }
});

module.exports = router;