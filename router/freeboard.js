const router  = require("express").Router();
const authorization = require("../middleware/authorization");
const freeBoardRepository = require("../repository/freeBoardRepository");
const freeBoardCommentsRepository = require("../repository/freeBoardCommentsRepository");

const {
    ACCESS_PRIVATE_KEY
} = process.env;

router.post("/post", authorization.reIssueToken,
    async (req, res) => {
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
);

router.get("/post/:id", async (req, res) => { //좋아요, 댓글 기능구현 후 수정할 것
    try {
        const { id } = req.params;
        const row = await freeBoardRepository.selectFreeBoardPost(id);

        return res.status(200).json(row);
    } catch(error) {
        console.log(error);

        return res.status(500).json({ message: "게시글 가져오기 실패" });
    }
});

router.put("/post/:postId", authorization.reIssueToken,
    async (req, res) => {
        try {
            const decodedToken = authorization.verifyToken(
                req.headers["authorization"],
                ACCESS_PRIVATE_KEY
            );
            const { postId } = req.params;
            const selectRow = await freeBoardRepository.selectFreeBoardPost(id);

            if (decodedToken.id === selectRow.user_id) {
                const { body } = req;
                const updateRow = await freeBoardRepository.updateFreeBoardPost(decodedToken, postId, body);

                if (updateRow.affectedRows === 1) {
                    return res.status(200).json({ message: "게시글 수정 완료" });
                }
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json( { message: "수정 권한이 없습니다." });
        }
    }
);

router.delete("/post/:postId", authorization.reIssueToken,
    async (req, res) => {
        try{
            const decodedToken = authorization.verifyToken(
                req.headers["authorization"],
                ACCESS_PRIVATE_KEY
            );
            const { postId } = req.params;
            const selectRow = await freeBoardRepository.selectFreeBoardPost(postId);

            if (decodedToken.id === selectRow.user_id) {
                const deleteRow = await freeBoardRepository.deleteFreeBoardPost(decodedToken, postId);

                if (deleteRow.affectedRows === 1) {
                    res.status(200).json({ message: "게시글 삭제완료" });
                }
            }
        } catch(error) {
            console.log(error);
            res.status(500).json({ message: "게시글 삭제 권한이 없습니다." });
        }
    }
);

router.post("/post/:postId/comments", authorization.reIssueToken,
    async (req, res) => {
        try {
            const decodedToken = authorization.verifyToken(
                req.headers["authorization"],
                ACCESS_PRIVATE_KEY
            );

            if (decodedToken) {
                const { postId } = req.params;
                const { body } = req;
                const row = await freeBoardCommentsRepository.insertFreeBoardComments(decodedToken, postId, body);

                if (row.affectedRows === 1) {
                    return res.status(200).json({ message: "댓글 작성 완료" });
                }
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json({ message: "댓글 작성 권한이 없습니다." });
        }
    }
);

router.put("/post/:postId/comments/:commentId", authorization.reIssueToken,
    async (req, res) => {
        try {
            const decodedToken = authorization.verifyToken(
                req.headers["authorization"],
                ACCESS_PRIVATE_KEY
            );

            const { postId, commentId } = req.params;
            const selectRow = await freeBoardCommentsRepository.selectFreeBoardComments(commentId);

            if (decodedToken.id === selectRow.user_id) {
                const { body } = req;
                const updateRow = await freeBoardCommentsRepository.updateFreeBoardComments(decodedToken, postId, commentId, body);

                if (updateRow.affectedRows === 1) {
                    const row = await freeBoardCommentsRepository.selectFreeBoardComments(commentId);
                    return res.status(200).json(row);
                }
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json({ message: "댓글 수정 권한이 없습니다." });
        }
    }
);

router.delete("/post/:postId/comments/:commentId", authorization.reIssueToken,
    async (req, res) => {
        
    }
)
module.exports = router;