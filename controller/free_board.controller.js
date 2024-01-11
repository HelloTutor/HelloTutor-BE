const authorization = require("../middleware/authorization");
const freeBoardRepository = require("../repository/freeBoardRepository");
const { ACCESS_PRIVATE_KEY } = process.env;

async function selectAllFreeBoard(req, res) {
    try {
        let { page, pageSize, search } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = 10;
        }

        const limit = String(pageSize);
        const offset = String((page - 1) * limit);

        if (search) {
            const row = await freeBoardRepository.selectSearchFreeBoard(`${search}%`, offset, limit);
            return res.status(200).json(row);
        } else {
            const row = await freeBoardRepository.selectAllFreeBoard(offset, limit);
            return res.status(200).json(row);
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function insertFreeBoard(req, res) {
    try {
        const decodedToken = authorization.verifyToken(
            req.headers["authorization"],
            ACCESS_PRIVATE_KEY
        );

        if (decodedToken) {
            const { body } = req;
            const row = await freeBoardRepository.insertFreeBoard(decodedToken, body);

            if (row.affectedRows === 1) {
                return res.status(200).json({ message: "게시판 작성 완료" });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "토큰 기간 만료" });
    }
}

async function putFreeBoard(req, res) {
    try {
        const decodedToken = authorization.verifyToken(
            req.headers["authorization"],
            ACCESS_PRIVATE_KEY
        );
        const { postId } = req.params;
        const selectRow = await freeBoardRepository.selectFreeBoard(postId);

        if (decodedToken.id === selectRow.user_id) {
            const { body } = req;
            const updateRow = await freeBoardRepository.updateFreeBoard(decodedToken, postId, body);

            if (updateRow.affectedRows === 1) {
                return res.status(200).json({ message: "게시글 수정 완료" });
            }
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json( { message: "수정 권한이 없습니다." });
    }
}

async function deleteFreeBoard(req, res) {
    try{
        const decodedToken = authorization.verifyToken(
            req.headers["authorization"],
            ACCESS_PRIVATE_KEY
        );
        const { postId } = req.params;
        const selectRow = await freeBoardRepository.selectFreeBoard(postId);

        if (decodedToken.id === selectRow.user_id) {
            const deleteRow = await freeBoardRepository.deleteFreeBoard(decodedToken, postId);

            if (deleteRow.affectedRows === 1) {
                res.status(200).json({ message: "게시글 삭제완료" });
            }
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "게시글 삭제 권한이 없습니다." });
    }
}

async function selectFreeBoard(req, res) {
    try {
        const { postId } = req.params;
        const row = await freeBoardRepository.selectFreeBoard(postId);

        return res.status(200).json(row);
    } catch(error) {
        console.log(error);

        return res.status(500).json({ message: "게시글 가져오기 실패" });
    }
}

module.exports = {
    selectAllFreeBoard,
    insertFreeBoard,
    putFreeBoard,
    deleteFreeBoard,
    selectFreeBoard
}