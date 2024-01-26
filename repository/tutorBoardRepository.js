const connection = require("../db/connection");
const query = require("../db/query.json");

async function selectAll(offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.totalCount);
        const [row] = await conn.execute(query.tutorBoard.selectAll, [offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
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
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.searchAllCount, [search]);
        const [row] = await conn.execute(query.tutorBoard.selectAllSearch, [search, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectSortReviewCount(offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.SortTotalCount);
        const [row] = await conn.execute(query.tutorBoard.selectSortReviewCount, [offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectSortReviewCountSearch(search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.SortSearchTotalCount, [search]);
        const [row] = await conn.execute(query.tutorBoard.selectSortReviewCountSearch, [search, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectSortReviewAvg(offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.SortTotalCount);
        const [row] = await conn.execute(query.tutorBoard.selectSortReviewAvg, [offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectSortReviewAvgSearch(search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.SortSearchTotalCount, [search]);
        const [row] = await conn.execute(query.tutorBoard.selectSortReviewAvgSearch, [search, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectSortAnswerCount(offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.SortTotalCount);
        const [row] = await conn.execute(query.tutorBoard.selectSortAnswerCount, [offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectSortAnswerCountSearch(search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.SortSearchTotalCount, [search]);
        const [row] = await conn.execute(query.tutorBoard.selectSortAnswerCountSearch, [search, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subject(subject, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.subjectTotalCount, [subject]);
        const [row] = await conn.execute(query.tutorBoard.subject, [subject, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subjectSearch(subject, search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.subjectSearchTotalCount, [subject, search]);
        const [row] = await conn.execute(query.tutorBoard.subjectSearch, [subject, search, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subjectReviewCount(subject, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.subjectTotalCount, [subject]);
        const [row] = await conn.execute(query.tutorBoard.subjectReviewCount, [subject, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subjectReviewAvg(subject, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.subjectTotalCount, [subject]);
        const [row] = await conn.execute(query.tutorBoard.subjectReviewAvg, [subject, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subjectAnswerCount(subject, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.subjectTotalCount, [subject]);
        const [row] = await conn.execute(query.tutorBoard.subjectAnswerCount, [subject, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subjectReviewCountSearch(subject, search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.subjectSearchTotalCount, [subject, search]);
        const [row] = await conn.execute(query.tutorBoard.subjectAnswerCountSearch, [subject, search, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subjectReviewAvgSearch(subject, search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.subjectSearchTotalCount, [subject, search]);
        const [row] = await conn.execute(query.tutorBoard.subjectReviewAvgSearch, [subject, search, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function subjectAnswerCountSearch(subject, search, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.tutorBoard.subjectSearchTotalCount, [subject, search]);
        const [row] = await conn.execute(query.tutorBoard.subjectAnswerCountSearch, [subject, search, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    selectAll,
    selectAllSearch,
    selectSortReviewCount,
    selectSortReviewCountSearch,
    selectSortReviewAvg,
    selectSortReviewAvgSearch,
    selectSortAnswerCount,
    selectSortAnswerCountSearch,
    subject,
    subjectSearch,
    subjectReviewCount,
    subjectReviewCountSearch,
    subjectReviewAvg,
    subjectReviewAvgSearch,
    subjectAnswerCount,
    subjectAnswerCountSearch
}