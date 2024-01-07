const connection = require("../db/connection");
const bcrypt = require("bcrypt");
<<<<<<< HEAD
const tuteeRepository = require("./tuteeRepository");
const tutorRepository = require("./tutorRepository");

const query = {
    insertUser: "INSERT INTO tb_user (`email`, `pw`, `name`, `role`) VALUES (?, ?, ?, ?)",
    insertOauthUser: "INSERT INTO tb_user (`email`, `name`, `role`) VALUES (?, ?, ?)",
    findUser_email: "SELECT * FROM tb_user WHERE email = ?",
    findUser_id: "SELECT * FROM tb_user WHERE id = ?",
    updateUser_pw: "UPDATE tb_user SET `pw`=? WHERE `email` = ?"
}
=======
const query = require("../db/query.json");
>>>>>>> main

async function insertUser(user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);

    try {
        const conn = await connection();
        const [row] = await conn.execute(query.user.insert, [user.email, bcryptPw, user.name, user.role]);

        if (user.role === 0) {
            conn.execute(query.tutee.insert, [row.insertId, null]);
        }

        if (user.role === 1) {
            conn.execute(query.tutor.insert, [row.insertId]);
        }

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function findUser_email(user_email) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.user.findByEmail, [user_email]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function findUser_id(user_id) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.user.findById, [user_id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function updateUser_pw(user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);

    try {
        const conn = await connection();
        const [row] = await conn.execute(query.user.update_pw, [bcryptPw, user.email]);

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
    insertUser,
    findUser_email,
    findUser_id,
    updateUser_pw
}
