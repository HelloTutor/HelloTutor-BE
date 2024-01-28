const router  = require("express").Router({mergeParams: true});
const authorization = require("../middleware/authorization");
const likeController = require("../controller/like.controller");
const freeBoardController = require("../controller/freeBoard.controller");
const freeBoardComments = require("./freeBoardComments");
const boardParser = require("../middleware/boardParser");
const upload = require("../config/multer/multerConfig");

router.get("/", freeBoardController.selectAllFreeBoard);

router.post("/image", upload.array("freeBoardImage"), freeBoardController.uploadImage);

router.post("/", authorization.reIssueToken, boardParser.boardContentParser, freeBoardController.insertFreeBoard);

router.get("/:postId", freeBoardController.selectFreeBoard);

router.put("/:postId", authorization.reIssueToken, boardParser.boardContentParser, freeBoardController.putFreeBoard);

router.delete("/:postId", authorization.reIssueToken, freeBoardController.deleteFreeBoard);

router.post("/:postId/like", authorization.reIssueToken, likeController.freeBoardLike);

router.use("/:postId/comments", freeBoardComments);

module.exports = router;
