const freeBoardRepository = require("../repository/freeBoardRepository");

async function selectAllFreeBoard(req, res) {
    try {
        let { page, pageSize, search } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = "10";
        }

        const offset = String((page - 1) * pageSize);

        if (search) {
            const row = await freeBoardRepository.selectSearchFreeBoard(`%${search}%`, offset, pageSize);
            return res.status(200).json(row);
        } else {
            const row = await freeBoardRepository.selectAllFreeBoard(offset, pageSize);
            return res.status(200).json(row);
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function insertFreeBoard(req, res) {
    try {
        const { user, body } = req;

        if (user) {
            const row = await freeBoardRepository.insertFreeBoard(user, body);

            if (row.affectedRows === 1) {
                return res.status(200).json({ message: "게시판 작성 완료" });
            }
        } else {
            return res.status(500).json({ message: "게시글 작성권한이 없습니다." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function putFreeBoard(req, res) {
    try {
        const { params: { postId }, user } = req;
        const selectRow = await freeBoardRepository.selectFreeBoard(postId);

        if (user.id === selectRow.user_id) {
            const { body } = req;
            const updateRow = await freeBoardRepository.updateFreeBoard(user, postId, body);

            if (updateRow.affectedRows === 1) {
                return res.status(200).json({ message: "게시글 수정 완료" });
            }
        } else {
            return res.status(500).json({ message: "게시글 수정권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function deleteFreeBoard(req, res) {
    try{
        const { params: { postId }, user } = req;
        const selectRow = await freeBoardRepository.selectFreeBoard(postId);

        if (user.id === selectRow.user_id) {
            const deleteRow = await freeBoardRepository.deleteFreeBoard(postId, user);

            if (deleteRow.affectedRows === 1) {
                res.status(200).json({ message: "게시글 삭제완료" });
            }
        } else {
            res.status(500).json({ message: "게시글 삭제권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "에러발생" });
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