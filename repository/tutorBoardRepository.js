const connection = require("../db/connection");
const query = require("../db/query.json");

async function selectAll(subject, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectAll, [subject, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectReview(subject, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectReview, [subject, offset, pageSize]);

        return row;
    } catch(error) {
        throw error
    } finally {
        if(conn) conn.release();
    }
}

async function selectReviewSearch(subject, search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectReviewSearch, [subject, search, offset, pageSize]);

        return row;
    } catch(error) {
        throw error
    } finally {
        if(conn) conn.release();
    }
}

async function selectAvgScore(subject, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectAvgScore, [subject, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectAvgScoreSearch(subject, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectAvgScoreSearch, [subject, search, offset, pageSize]);

        return row;
    } catch(error) {
        throw error
    } finally {
        if(conn) conn.release();
    }
}

async function selectAnswer(subject, offset, pageSize) {
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectAnswer, [subject, offset, pageSize]);

        return row;
    } catch(error) {
        throw error
    } finally {
        if(conn) conn.release();
    }
}

async function selectAnswerSearch(subject, search, offset, pageSize) {
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectAnswerSearch, [subject, search, offset, pageSize]);

        return row;
    } catch(error) {
        throw error
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    selectAll,
    selectReview,
    selectReviewSearch,
    selectAvgScore,
    selectAvgScoreSearch,
    selectAnswer,
    selectAnswerSearch
}