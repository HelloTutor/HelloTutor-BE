const userRepository = require('../repository/userRepository');

async function validatedEmail(req, res, next) {
    const { body } = req;
    const overlappedEmail = await userRepository.findUserEmail(body.email);

    if (overlappedEmail) {
        return res.status(400).json({ result: false, message: "중복된 이메일 입니다." });
    }

    const email = body.email;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ result: false, message: "유효하지 않은 이메일 양식입니다." });
    }

    next();
}

async function validatedPassword(req, res, next) {
    const { body }  = req;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(body.pw)) {
        return res.status(400).json({ result: false, message: "유효하지 않은 비밀번호 양식입니다." });
    }

    if (body.pw !== body.checkPw) {
        return res.status(400).json({ result: false, message: "비밀번호가 일치하지 않습니다." });
    }

    next();
}

module.exports = {
    validatedEmail,
    validatedPassword,
}
