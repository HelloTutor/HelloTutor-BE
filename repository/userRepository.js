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

async function findUserEmail(userEmail) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.user.findByEmail, [userEmail]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function findUserId(userId) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.user.findById, [userId]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateUserPw(user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.user.updatePw, [bcryptPw, user.email]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateUserPw(user) {
    const bcryptPw = bcrypt.hashSync(user.pw, 11);
    let conn;
    try {
        conn = await connection();
        const row = await conn.execute(query.updateUserPw, [bcryptPw, user.email]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    insertUser,
    findUserEmail,
    findUserId,
    updateUserPw
}
