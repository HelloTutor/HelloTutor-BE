const router = require("express").Router({mergeParams: true});
const token = require("../middleware/token");
const freeBoardCommentsController = require("../controller/freeBoardComments.controller");
const likeController = require("../controller/like.controller");

router.get("/", freeBoardCommentsController.selectAllFreeBoardComments);

router.post("/", token.authorization, freeBoardCommentsController.insertFreeBoardComments);

router.get("/:commentId", freeBoardCommentsController.selectFreeBoardComments);

router.put("/:commentId", token.authorization, freeBoardCommentsController.putFreeBoardComments);

router.delete("/:commentId", token.authorization, freeBoardCommentsController.deleteFreeBoardComments);

router.post("/:commentId/like", token.authorization, likeController.freeBoardCommentsLike);

module.exports = router;