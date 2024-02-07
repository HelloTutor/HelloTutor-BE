const { ACCESS_PRIVATE_KEY, REFRESH_PRIVATE_KEY, ALGORITHM } = process.env;
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");
const tuteeRepository = require("../repository/tuteeRepository");
const bcrypt = require("bcrypt");

async function issueToken (req, res, next) {
    try {
        const { body } = req;
        const row = await userRepository.findUserEmail(body.email);

        if (row) {
            if (row.role === 0) {
                const tutee = await tuteeRepository.findTuteeId(row.id);

                if (tutee.google_id) {
                    return res.status(200).json({ message: "해당 이메일은 소셜회원입니다." });
                }
            }

            const isPw = bcrypt.compareSync(body.pw, row.pw);

            if (!isPw) {
                return res.status(401).json({ message: "잘못된 비밀번호 입니다." });
            }

            const accessToken = generateAccessToken({
                id: row.id,
                status: row.status
            });
            const refreshToken = generateRefreshToken({
                id: row.id,
                status: row.status
            });

            const tokenRow = await userRepository.updateToken(refreshToken, row.id);

            if(tokenRow) {
                return res.send({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    message: "로그인 성공"
                    });
            }
        } else {
            return res.status(404).json({ message: "해당 이메일이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

function generateAccessToken(rowInfo) {
    return jwt.sign(rowInfo, ACCESS_PRIVATE_KEY, {
        algorithm: ALGORITHM,
        expiresIn: "1m"
    });
}

function generateRefreshToken(rowInfo) {
    return jwt.sign(rowInfo, REFRESH_PRIVATE_KEY, {
        algorithm: ALGORITHM,
        expiresIn: "14d"
    });
}

async function authorization(req, res, next) {
    try {
        const accessToken = verifyToken(req.headers["authorization"], ACCESS_PRIVATE_KEY);
        if (accessToken) {
            req.user = await userRepository.findUserId(accessToken.id);
        }
    } catch(error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "accessToken expired" });
        }
        return res.status(403).json({ message: "Invalid accessToken" });
    }
    next();
}

async function reIssueToken(req, res) {
    try {
        const accessToken = verifyToken(req.headers["authorization"], ACCESS_PRIVATE_KEY);
        const refreshToken = verifyToken(req.headers["refresh"], REFRESH_PRIVATE_KEY);

        if ((refreshToken === "TokenExpiredError")) {
            return res.status(401).json({ message:"refreshToken expired" });
        } else {
            const row = await userRepository.findUserToken(refreshToken.id);

            if(req.headers["refresh"] !== row.refreshToken) {
                return res.status(401).json({ message: "Invalid refreshToken" });
            }

            if ((accessToken === "TokenExpiredError")) {
                const newAccessToken = generateAccessToken({
                    id: refreshToken.id,
                    status: refreshToken.status
                });

                res.setHeader("Authorization", newAccessToken);
                return res.status(200).json({ message: "accessToken 재발급 완료" });
            }
        }
    } catch(error) {
        console.log(error);
    }
}

function verifyToken(token, secret_key) {
    try {
        let decodedToken = jwt.verify(token, secret_key);

        return decodedToken;
    } catch (err) {
        return err.name;
    }
}

module.exports = {
    issueToken,
    reIssueToken,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    authorization
}