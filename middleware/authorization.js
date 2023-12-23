const {
    ACCESS_PRIVATE_KEY,
    REFRESH_PRIVATE_KEY,
    ALGORITHM
} = process.env;
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");

async function issueToken (req, res) {
    const { body } = req;
    const row = await userRepository.findUser_email(body.email);

    if (!row) {
        res.status(400).send( {message: "해당 이메일이 없습니다."});
    }

    const isPw = bcrypt.compareSync(body.pw, row.pw);

    if (!isPw) {
        res.status(400).send({ message: "잘못된 비밀번호 입니다."});
    }

    const accessToken = generateAccessToken( { id: row.id, email: row.email, status: row.status });
    const refreshToken = generateRefreshToken( { id: row.id, email: row.email, status: row.status });

    res.send( { accessToken: accessToken, refreshToken: refreshToken, message: "로그인 성공" });
}

function generateAccessToken(rowInfo) {
    return jwt.sign(rowInfo,
        ACCESS_PRIVATE_KEY,
        {
            algorithm: ALGORITHM,
            exp: "1h"
        });
}

function generateRefreshToken(rowInfo) {
    return jwt.sign(rowInfo,
        REFRESH_PRIVATE_KEY,
        {
            algorithm: ALGORITHM,
            exp: "14d"
        });
}

async function reIssueToken(req, res) {
    const accessToken = req.headers["Authorization"];
    const refreshToken = req.headers["refreshToken"];

    //accessToken, refreshToken 둘다 expired 일때
    if (!(accessToken && refreshToken)) {
        return res.redirect("/auth/login");
    }

    //accessToken만 expired일때
    if (checkExpiredToken(accessToken, refreshToken) === 1) {
        const parseRefreshToken = verifyToken(refreshToken, REFRESH_PRIVATE_KEY);
        accessToken = generateAccessToken(parseRefreshToken.id, parseRefreshToken.email, parseRefreshToken.status);

        return res.send( { accessToken: accessToken });
    }

    //refreshToken만 expired일때
    if (checkExpiredToken(accessToken, refreshToken) === 2) {
        const parseAccessToken = verifyToken(accessToken, ACCESS_PRIVATE_KEY);
        refreshToken = generateRefreshToken(parseAccessToken.id, parseAccessToken.email, parseAccessToken.status);

        return res.send( { refreshToken: refreshToken });
    }
}

function verifyToken(token, secret_key) {
    return jwt.verify(token, secret_key);
}

function checkExpiredToken(accessToken, refreshToken) {
    if (!accessToken) {
        return 1
    }

    if (!refreshToken) {
        return 2;
    }
}

module.exports = {
    issueToken,
    reIssueToken
}