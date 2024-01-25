const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertPayment(tutorId, user, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.payment.insert, [tutorId, user.id, body.questionBoardId, body.amount, body.paymentId]);

        return row;
    } catch(error) {
        conn?.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updatePayment() {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.payment.update);

        return row;
    } catch(error) {
        conn?.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectPayment(body) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.payment.select, [body.questionBoardId]);

        return row;
    } catch(error) {
        conn?.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    insertPayment,
    updatePayment,
    selectPayment
}