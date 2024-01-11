const connection = require("../db/connection");
const bcrypt = require("bcrypt");
const query = require("../db/query.json");

async function insertUser(user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.user.insert, [user.email, bcryptPw, user.name, user.role]);

        if (user.role === 0) {
            conn.execute(query.tutee.insert, [row.insertId, null]);
        }

        if (user.role === 1) {
            conn.execute(query.tutor.insert, [row.insertId]);
        }

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function findUser_email(user_email) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.user.findByEmail, [user_email]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function findUser_id(user_id) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.user.findById, [user_id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateUser_pw(user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.user.update_pw, [bcryptPw, user.email]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateUser_pw(user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);
    let conn;
    try {
        conn = await connection();
        const row = await conn.execute(query.updateUser_pw, [bcryptPw, user.email]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    insertUser,
    findUser_email,
    findUser_id,
    updateUser_pw
}
