const freeBoardCommentsRepository = require("../repository/freeBoardCommentsRepository");

async function insertFreeBoardComments(req, res) {
    try {
        const { params: { postId }, user, body} = req;

        if (user) {
            const row = await freeBoardCommentsRepository.insertFreeBoardComments(user, postId, body);

            if (row.affectedRows === 1) {
                return res.status(200).json({ message: "댓글 작성 완료" });
            }
        } else {
            return res.status(500).json({ message: "댓글 작성 권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function putFreeBoardComments(req, res) {
    try {
        const { params: { postId, commentId }, user} =req;

        const selectRow = await freeBoardCommentsRepository.selectFreeBoardComments(commentId, postId);

        if (user.id === selectRow.user_id) {
            const { body } = req;
            const updateRow = await freeBoardCommentsRepository.updateFreeBoardComments(user, postId, commentId, body);

            if (updateRow.affectedRows === 1) {
                return res.status(200).json({ message: "댓글 수정 완료" });
            }
        } else {
            return res.status(500).json({ message: "댓글 수정 권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function deleteFreeBoardComments(req, res) {
    try {
        const { params: { postId, commentId }, user} = req;

        const selectRow = await freeBoardCommentsRepository.selectFreeBoardComments(commentId, postId);

        if (user.id === selectRow.user_id) {
            const deleteRow = await freeBoardCommentsRepository.deleteFreeBoardComments(commentId, postId, user);

            if (deleteRow.affectedRows === 1) {
                return res.status(200).json({ message: "댓글 삭제 완료" });
            }
        } else {
            return res.status(500).json({ message: "댓글삭제권한이 없습니다." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function selectFreeBoardComments(req, res) {
    try {
        const { postId, commentId } = req.params;
        const row = await freeBoardCommentsRepository.selectFreeBoardComments(commentId, postId);

        if (row) {
            return res.status(200).json(row);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "에러발생" });
    }
}

async function selectAllFreeBoardComments(req, res) {
    try {
        const { postId } = req.params;
        let { page, pageSize } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if (!pageSize || (pageSize <= 0)) {
            pageSize = "10";
        }

        const offset = String((page - 1) * pageSize);
        const row = await freeBoardCommentsRepository.selectAllFreeBoardComments(postId, offset, pageSize);

        if (row) {
            return res.status(200).json(row);
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    insertFreeBoardComments,
    putFreeBoardComments,
    deleteFreeBoardComments,
    selectFreeBoardComments,
    selectAllFreeBoardComments
}