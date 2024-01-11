const { ACCESS_PRIVATE_KEY, REFRESH_PRIVATE_KEY, ALGORITHM } = process.env;
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");
const tuteeRepository = require("../repository/tuteeRepository");
const bcrypt = require("bcrypt");

async function issueToken (req, res) {
    const { body } = req;
    const row = await userRepository.findUser_email(body.email);
    const tutee = await tuteeRepository.findTuteeId(row.id);

    if (!row) {
        return res.status(400).json( {message: "해당 이메일이 없습니다."});
    }

    if (!tutee.google_id) {
        const isPw = bcrypt.compareSync(body.pw, row.pw);

        if (!isPw) {
            return res.status(400).json({ message: "잘못된 비밀번호 입니다."});
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

    if (accessToken === "TokenExpiredError" && refreshToken === "TokenExpiredError") {

        return res.redirect("/auth/login");
    }

    if (accessToken === "TokenExpiredError" && refreshToken) {
        const newAccessToken = generateAccessToken({
            id: refreshToken.id,
            email: refreshToken.email,
            status: refreshToken.status
        });

        return res.send({ accessToken: newAccessToken });
    }

    if (accessToken && refreshToken === "TokenExpiredError") {
        const newRefreshToken = generateRefreshToken({
            id: accessToken.id,
            email: accessToken.email,
            status: accessToken.status
        });

        return res.send({ refreshToken: newRefreshToken });
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