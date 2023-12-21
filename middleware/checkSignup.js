const userRepository = require('../repository/userRepository');

async function validatedEmail(req, res, next) {
    const email = req.body.email;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ result: false, message: "유효하지 않은 이메일 양식입니다." });
    }

    next();
}

async function overlappedEmail(req, res, next) {
    const user = req.body;
    const overlappedEmail = await userRepository.findUser_email(user.email);

    if (overlappedEmail) {
        return res.status(400).json({ result: false, message: "중복된 이메일 입니다." });
    }

    next();
}

async function validatedPassword(req, res, next) {
    const user = req.body;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(user.pw)) {
        return res.status(400).json({ result: false, message: "유효하지 않은 비밀번호 양식입니다." });
    }

    next();
}

module.exports = {
    validatedEmail,
    overlappedEmail,
    validatedPassword,
}
