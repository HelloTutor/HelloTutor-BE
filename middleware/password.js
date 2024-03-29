const mailer = require("nodemailer");
const userRepository = require("../repository/userRepository");
const tuteeRepository = require("../repository/tuteeRepository");
const authorization = require("./token");

const {
    EMAIL_SERVICE,
    NODE_MAILER_ID,
    NODE_MAILER_PW,
    BASE_URL,
    ACCESS_PRIVATE_KEY
} = process.env;

async function sendMail(req, res) {
    try{
        const { body } = req;
        const row = await userRepository.findUserEmail(body.email);

        if (row) {
            const tutee = await tuteeRepository.findTuteeId(row.id);

            if (tutee.google_id) {
                return res.status(400).json({ message: "소셜회원은 비밀번호를 변경할 수 없습니다." });
            }

            const accessToken = authorization.generateAccessToken({ email: row.email });
            const transporter = mailer.createTransport({
                service: EMAIL_SERVICE,
                auth: {
                    user: NODE_MAILER_ID,
                    pass: NODE_MAILER_PW
                }
            });

            transporter.sendMail({
                to: row.email,
                subject: "비밀번호를 재설정 해주세요!",
                html: `<p>비밀번호 초기화를 위해 아래의 URL을 클릭하여 주세요.</p>` +
                    `<a href="http://${BASE_URL}/auth/login/resetPw/${accessToken}">비밀번호 재설정 링크</a>`,
            }, (err, info) => {
                if(err) {
                    console.error(err);
                    return res.status(500).json({ message: "에러발생" });
                } else {
                    return res.status(200).json({ message: "비밀번호 이메일 전송 완료" });
                }
            });
            return res.status(200).json({ message: "비밀번호 이메일 전송 완료" });
        }
        return res.status(400).json({ message: "해당 이메일이 일치하는 회원이 없습니다." });
    } catch(error) {
        return res.status(500).json({ message: "에러발생" });
    }
}

async function resetPw(req, res) {
    try {
        const { body } = req;
        const decodedToken = authorization.verifyToken(req.params.accessToken, ACCESS_PRIVATE_KEY);

        if (decodedToken) {
            const user = {
                email: decodedToken.email,
                pw: body.pw,
                checkPw: body.checkPw
            }
            const row = await userRepository.updateUserPw(user);

            if (row.affectedRows === 1) {
                return res.status(200).json({ message: "비밀번호가 변경 되었습니다." });
            }
        } else {
            return res.status(400).json({ message: "비밀번호 변경 시간이 지났습니다." });
        }
    } catch (error) {
        return res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    sendMail,
    resetPw
}