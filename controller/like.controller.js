const freeBoardLikeRepository = require("../repository/freeboardLikeRepository");
const authorization = require("../middleware/authorization");
const { ACCESS_PRIVATE_KEY } = process.env;

async function freeBoardLike(req, res) {
    try {
        const decodedToken = authorization.verifyToken(
            req.headers["authorization"],
            ACCESS_PRIVATE_KEY
        );

        const { postId } = req.params;
        const selectRow = await freeBoardLikeRepository.selectFreeBoardLike(postId, decodedToken);
        console.log("selectRow좀 보자", selectRow);
        if (selectRow === undefined) {
            const insertRow = await freeBoardLikeRepository.insert(decodedToken, postId, null);

            if (insertRow.affectedRows === 1) {
                return res.status(200).json({ message: "좋아요 등록 완료" });
            }
        }

        if (selectRow.user_id === decodedToken.id) {
            const deleteRow = await freeBoardLikeRepository.deleteFreeBoardLike(decodedToken, postId);

            if (deleteRow.affectedRows === 1) {
                return res.status(200).json({ message: "좋아요 삭제 완료" });
            }
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "error 발생" });
    }
}

async function freeBoardCommentsLike(req, res) {
    try {
        const decodedToken = authorization.verifyToken(
            req.headers["authorization"],
            ACCESS_PRIVATE_KEY
        );

        const { postId, commentId } = req.params;
        const selectRow = await freeBoardLikeRepository.selectFreeBoardCommentsLike(decodedToken, commentId);
        console.log("selectRow를 알아보자", selectRow);
        if (selectRow === undefined) {
            const insertRow = await freeBoardLikeRepository.insert(decodedToken, null, commentId);

            if (insertRow.affectedRows === 1) {
                return res.status(200).json({ message: "좋아요 등록 완료" });
            }
        }

        if (selectRow.user_id === decodedToken.id) {
            const deleteRow = await freeBoardLikeRepository.deleteFreeBoardCommentsLike(decodedToken, commentId);

            if (deleteRow.affectedRows === 1) {
                return res.status(200).json({ message: "좋아요 삭제 완료" });
            }
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "error 발생" });
    }
}

module.exports = {
    freeBoardLike,
    freeBoardCommentsLike
}