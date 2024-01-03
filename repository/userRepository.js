const connection = require("../db/connection");
const bcrypt = require("bcrypt");
const tuteeRepository = require("./tuteeRepository");
const tutorRepository = require("./tutorRepository");

const query = {
    insertUser: "INSERT INTO tb_user (`email`, `pw`, `name`, `role`) VALUES (?, ?, ?, ?)",
    insertOauthUser: "INSERT INTO tb_user (`email`, `name`, `role`) VALUES (?, ?, ?)",
    findUser_email: "SELECT * FROM tb_user WHERE email = ?",
    findUser_id: "SELECT * FROM tb_user WHERE id = ?",
    updateUser_pw: "UPDATE tb_user SET `pw`=? WHERE `email` = ?"
}

async function insertUser(user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);

    try {
        const conn = await connection();
        const [row] = await conn.execute(query.insertUser, [user.email, bcryptPw, user.name, user.role]);

        if (user.role === 0) {
            conn.execute(tuteeRepository.query.insertTutee, [row.insertId]);
        }

        if (user.role === 1) {
            conn.execute(tutorRepository.query.insertTutor, [row.insertId]);
        }

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function findUser_email(user_email) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.findUser_email, [user_email]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function findUser_id(user_id) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.findUser_id, [user_id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function updateUser_pw(user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);

    try {
        const conn = await connection();
        const row = await conn.execute(query.updateUser_pw, [bcryptPw, user.email]);
        console.log("update Row는 어떻게 생겼을까?", row);
        return row;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    query,
    insertUser,
    findUser_email,
    findUser_id,
    updateUser_pw
}
