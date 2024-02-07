const router  = require("express").Router({mergeParams: true});
const token = require("../middleware/token");
const likeController = require("../controller/like.controller");
const freeBoardController = require("../controller/freeBoard.controller");
const freeBoardComments = require("./freeBoardComments");
const boardParser = require("../middleware/boardParser");
const upload = require("../config/multer/multerConfig");

router.get("/", freeBoardController.selectAllFreeBoard);

router.post("/image", token.authorization, upload.array("freeBoardImage"), freeBoardController.uploadImage);

router.post("/", token.authorization, boardParser.boardContentParser, freeBoardController.insertFreeBoard);

router.get("/:postId", freeBoardController.selectFreeBoard);

router.put("/:postId", token.authorization, boardParser.boardContentParser, freeBoardController.putFreeBoard);

router.delete("/:postId", token.authorization, freeBoardController.deleteFreeBoard);

router.post("/:postId/like", token.authorization, likeController.freeBoardLike);

router.use("/:postId/comments", freeBoardComments);

module.exports = router;
