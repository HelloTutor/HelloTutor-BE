const connection = require('../db/connection');
const bcrypt = require('bcrypt');

const query = {
    insertUser: "INSERT INTO tb_user (`email`, `pw`, `name`, `role`) VALUES (?, ?, ?, ?)", //나중에 status까지 req로 받아서 넣을것
    insertUser_tutee: "INSERT INTO tb_tutee(`id`) VALUES (?)",
    insertUser_tutor: "INSERT INTO tb_tutor(`id`) VALUES (?)",
    findUser_email : "SELECT * FROM tb_user WHERE email = ?",
}

async function insertUser (user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);

    try {
        const conn = await connection();
        const [row] = await conn.execute(query.insertUser, [user.email, bcryptPw, user.name, user.role]);
        // console.log("row좀 볼까?", row);
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
