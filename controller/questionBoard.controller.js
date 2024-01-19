const questionBoardRepository = require("../repository/questionBoardRepository");

async function insertQuestionBoard(req, res) {
    try{
        if (req.user) {
            const { checkSubject } = req.params;
            const { body } = req;
            const row = await questionBoardRepository.insertQuestionBoard(req.user, checkSubject, body);

            if (row.affectedRows === 1) {
                return res.status(200).json({ message: "질문 작성 완료" });
            }
        } else {
            return res.status(500).json({ message: "질문 권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function selectQuestionBoard(req, res) {
    try {
        const { postId, checkSubject } = req.params;
        const row = await questionBoardRepository.selectQuestionBoard(postId, checkSubject);

        return res.status(200).json(row);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "질문 가져오기 실패 "})
    }
}

async function putQuestionBoard(req, res) {
    try {
        const { user } = req;

        const { postId, checkSubject } = req.params;
        const selectRow = await questionBoardRepository.selectQuestionBoard(postId, checkSubject);

        if (user.id === selectRow.user_id) {
            const { body } = req;
            const updateRow = await questionBoardRepository.updateQuestionBoard(body, postId, checkSubject, user);

            if(updateRow.affectedRows === 1) {
                res.status(200).json({ message: "질문 수정 완료"});
            }
        } else {
            return res.status(500).json({ message: "질문 수정권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function deleteQuestionBoard(req, res) {
    try {
        const { params: { postId,checkSubject }, user } = req;

        const selectRow = await questionBoardRepository.selectQuestionBoard(postId, checkSubject);

        if (user.id === selectRow.user_id) {
            const deleteRow = await questionBoardRepository.deleteQuestionBoard(postId, checkSubject, user);

            if (deleteRow.affectedRows === 1) {
                res.status(200).json({ message: "질문 삭제 완료" });
            }
        } else {
            res.status(500).json({ message: "질문 삭제권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "에러발생" });
    }
}

async function selectAllQuestionBoard(req, res) {
    try {
        const { checkSubject } = req.params;
        let { page, pageSize, search } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = "10";
        }

        const offset = String((page - 1) * pageSize);

        if (search) {
            const row = await questionBoardRepository.selectSearchQuestionBoard(checkSubject, `${search}%`, offset, pageSize);
            return res.status(200).json(row);
        } else {
            const row = await questionBoardRepository.selectAllQuestionBoard(checkSubject, offset, pageSize);
            return res.status(200).json(row);
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    insertQuestionBoard,
    selectQuestionBoard,
    putQuestionBoard,
    deleteQuestionBoard,
    selectAllQuestionBoard
}