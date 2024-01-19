const connection = require("../db/connection");
const query = require("../db/query.json");

async function selectAllReview(tutorId, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.review.selectAll, [tutorId, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectLowScore(tutorId, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.review.selectLowScore, [tutorId, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectHighScore(tutorId, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.review.selectHighScore, [tutorId, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function avgCount(tutorId) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.review.avgCount, [tutorId]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}
module.exports = {
    selectAllReview,
    avgCount,
    selectLowScore,
    selectHighScore
}