const connection = require("../db/connection");
const bcrypt = require("bcrypt");
const tuteeRepository = require("./tuteeRepository");

const query = {
    insertUser: "INSERT INTO tb_user (`email`, `pw`, `name`, `role`) VALUES (?, ?, ?, ?)",
    insertOauthUser: "INSERT INTO tb_user (`email, `name`, `role`) VALUES (?, ?, ?)",
    insertUser_tutee: "INSERT INTO tb_tutee(`id`) VALUES (?)",
    insertUser_tutor: "INSERT INTO tb_tutor(`id`) VALUES (?)",
    findUser_email : "SELECT * FROM tb_user WHERE email = ?",
}

async function insertUser (user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);

    try {
        const conn = await connection();
        const [row] = await conn.execute(query.insertUser, [user.email, bcryptPw, user.name, user.role]);

        if (user.role === 0) {
            conn.execute(query.insertUser_tutee, [row.insertId]);
        }

        if (user.role === 1) {
            conn.execute(query.insertUser_tutor, [row.insertId]);
        }

        return row;
    } catch (error) {
        console.log(error);
    }
}

async function insertOauthUser (user) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.insertUser, [user.email, user.name, user.role]);
        await conn.execute(query.insertUser_tutee, [row.insertId]);
        await conn.execute(tuteeRepository.insertTuteeGoogleId)
    } catch (error) {

    }
}

async function findUser_email (user_email) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.findUser_email, [user_email]);

        return row;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertUser,
    findUser_email,
}
