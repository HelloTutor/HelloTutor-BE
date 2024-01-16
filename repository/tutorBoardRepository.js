const connection = require("../db/connection");
const query = require("../db/query.json");

async function selectAll(offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectAll, [offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectAllSearch(search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectAllSearch, [search, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFilterReviewCount(offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectFilterReviewCount, [offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFilterReviewCountSearch(search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectFilterReviewCountSearch, [search, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFilterReviewAvg(offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectFilterReviewAvg, [offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFilterReviewAvgSearch(search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectFilterReviewAvgSearch, [search, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFilterAnswerCount(offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectFilterAnswerCount, [offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFilterAnswerCountSearch(search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.selectFilterAnswerCountSearch, [search, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subject(subject, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.subject, [subject, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subjectSearch(subject, search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.tutorBoard.subjectSearch, [subject, search, offset, pageSize]);

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
    selectAllSearch,
    selectFilterReviewCount,
    selectFilterReviewCountSearch,
    selectFilterReviewAvg,
    selectFilterReviewAvgSearch,
    selectFilterAnswerCount,
    selectFilterAnswerCountSearch,
    subject,
    subjectSearch,
    selectReview,
    selectReviewSearch,
    selectAvgScore,
    selectAvgScoreSearch,
    selectAnswer,
    selectAnswerSearch
}