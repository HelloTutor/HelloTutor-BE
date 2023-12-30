const connection = require("../db/connection");
const bcrypt = require("bcrypt");
const tuteeRepository = require("./tuteeRepository");

const query = {
    insertUser: "INSERT INTO tb_user (`email`, `pw`, `name`, `role`) VALUES (?, ?, ?, ?)",
    insertOauthUser: "INSERT INTO tb_user (`email`, `name`, `role`) VALUES (?, ?, ?)",
    insertUser_tutee: "INSERT INTO tb_tutee(`id`) VALUES (?)",
    insertUser_tutor: "INSERT INTO tb_tutor(`id`) VALUES (?)",
    findUser_email: "SELECT * FROM tb_user WHERE email = ?",
    findUser_id: "SELECT * FROM tb_user WHERE id = ?"
}

async function insertUser(user) {
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
    } catch(error) {
        console.log(error);
    }
}

async function insertOauthUser(profile) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.insertOauthUser, [profile.emails[0].value, profile.displayName, 0]);
        console.log("row를 알아보자", row);

        if (profile.provider === "google") {
            const google_row = await conn.execute("INSERT INTO tb_tutee (`id`, `google_id`) VALUES (?, ?)", [row.insertId, profile.id]);
            return google_row;
        }

        if (profile.provider === "kakao") {
            const kakako_row = await conn.execute("INSERT INTO tb_tutee (`id`, `kakao_id`) VALUES (?, ?)", [row.insertId, profile.id]);
            return kakako_row;
        }
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

module.exports = {
    insertUser,
    findUser_email,
    insertOauthUser,
    findUser_id
}
