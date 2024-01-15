const { ACCESS_PRIVATE_KEY, REFRESH_PRIVATE_KEY, ALGORITHM } = process.env;
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");
const tuteeRepository = require("../repository/tuteeRepository");
const bcrypt = require("bcrypt");

async function issueToken (req, res) {
    const { body } = req;
    const row = await userRepository.findUserEmail(body.email);

    if (!row) {
        return res.status(404).json({ message: "해당 이메일이 없습니다." });
    }

    const tutee = await tuteeRepository.findTuteeId(row.id);

    if (!tutee.google_id) {
        const isPw = bcrypt.compareSync(body.pw, row.pw);

        if (!isPw) {
            return res.status(401).json({ message: "잘못된 비밀번호 입니다." });
        }
    }

    const accessToken = generateAccessToken({
        id: row.id,
        email: row.email,
        status: row.status
    });
    const refreshToken = generateRefreshToken({
        id: row.id,
        email: row.email,
        status: row.status
    });

    return res.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "로그인 성공"
    });
}

function generateAccessToken(rowInfo) {
    return jwt.sign(rowInfo, ACCESS_PRIVATE_KEY, {
        algorithm: ALGORITHM,
        expiresIn: "1h"
    });
}

function generateRefreshToken(rowInfo) {
    return jwt.sign(rowInfo, REFRESH_PRIVATE_KEY, {
        algorithm: ALGORITHM,
        expiresIn: "14d"
    });
}

async function reIssueToken(req, res, next) {
    const accessToken = verifyToken(req.headers["authorization"], ACCESS_PRIVATE_KEY);
    const refreshToken = verifyToken(req.headers["refresh"], REFRESH_PRIVATE_KEY);

    if ( !req.headers["authorization"] && !req.headers["refresh"] ) {
        return res.status(403).json({ message: "not authenticate" });
    }

    if ((refreshToken === "TokenExpiredError")) {
        return res.status(401).json({message:"token expired"});
    } else {
        if ((accessToken === "TokenExpiredError")) {
            const newAccessToken = generateAccessToken({
                id: refreshToken.id,
                email: refreshToken.email,
                status: refreshToken.status
            });

            return res.setHeader("Authorization",newAccessToken);
        }
    }
    next();
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
    verifyToken
}