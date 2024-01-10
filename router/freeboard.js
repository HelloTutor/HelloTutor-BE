const router  = require("express").Router({mergeParams: true});
const authorization = require("../middleware/authorization");
const likeController = require("../controller/like.controller");
const freeBoardController = require("../controller/free_board.controller");

router.get("/", freeBoardController.selectAllFreeBoard);

router.post("/", authorization.reIssueToken, freeBoardController.insertFreeBoard);

router.get("/:postId", freeBoardController.selectFreeBoard);

router.put("/:postId", authorization.reIssueToken, freeBoardController.putFreeBoard);

router.delete("/:postId", authorization.reIssueToken, freeBoardController.deleteFreeBoard);

router.post("/:postId/like", authorization.reIssueToken, likeController.freeBoardLike);

module.exports = router;
