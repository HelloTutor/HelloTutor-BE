const connection = require("../db/connection");
const bcrypt = require("bcrypt");
const query = require("../db/query.json");

async function insertUser(body) {
    const bcryptPw = bcrypt.hashSync(body.pw, 11);
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.user.insert, [body.email, bcryptPw, body.name, body.role]);

        if (body.role === 0) {
            conn.execute(query.tutee.insert, [row.insertId, null]);
        }

        if (body.role === 1) {
            const subject = JSON.stringify(body.subject);
            conn.execute(query.tutor.insert, [row.insertId, subject]);
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

async function updateProfile(filePath, user) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.user.updateProfile, [filePath, user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateToken(refreshToken, userId) {
    let conn;
    try{
        conn = await connection();
        const [row] = await conn.execute(query.user.updateToken, [refreshToken, userId]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function findUserToken(userId) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.user.findByToken, [userId]);

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
    updateUserPw,
    updateProfile,
    updateToken,
    findUserToken
}
