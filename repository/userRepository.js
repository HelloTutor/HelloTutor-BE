const connection = require('../db/connection');
const bcrypt = require('bcrypt');

const query = {
    insertUser: "INSERT INTO tb_user (`email`, `pw`, `name`) VALUES (?, ?, ?)", //나중에 status까지 req로 받아서 넣을것
    findUser_email : "SELECT * FROM tb_user WHERE email = ?",
}

async function insertUser (user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);

    try {
        const conn = connection();
        const row = await conn.execute(query.insertUser, [user.email, bcryptPw, user.name]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

async function findUser_email (user) {

    try {
        const conn = connection();
        const row = await conn.execute(query.findUser_email, [user.email]);
        console.log('row를 알아보자', row);
        return row;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertUser,
    findUser_email,
}
