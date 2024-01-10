const router = require("express").Router({mergeParams: true});
const authorization = require("../middleware/authorization");
const freeBoardCommentsController = require("../controller/free_Board_Comments.controller");
const likeController = require("../controller/like.controller");

router.get("/", freeBoardCommentsController.selectAllFreeBoardComments);

router.post("/", authorization.reIssueToken, freeBoardCommentsController.insertFreeBoardComments);

router.get("/:commentId", freeBoardCommentsController.selectFreeBoardComments);

router.put("/:commentId", authorization.reIssueToken, freeBoardCommentsController.putFreeBoardComments);

router.delete("/:commentId", authorization.reIssueToken, freeBoardCommentsController.deleteFreeBoardComments);

router.post("/:commentId/like", authorization.reIssueToken, likeController.freeBoardCommentsLike);

module.exports = router;