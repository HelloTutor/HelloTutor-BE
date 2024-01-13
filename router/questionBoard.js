const router  = require("express").Router({mergeParams: true});
const authorization = require("../middleware/authorization");
const questionBoardController = require("../controller/question_Board.controller");

router.post("/:subject", authorization.reIssueToken, questionBoardController.insertQuestionBoard);

router.get("/:subject", questionBoardController.selectAllQuestionBoard);

router.get("/:subject/:postId", questionBoardController.selectQuestionBoard);

router.put("/:subject/:postId", authorization.reIssueToken, questionBoardController.putQuestionBoard);

router.delete("/:subject/:postId", authorization.reIssueToken, questionBoardController.deleteQuestionBoard);

module.exports = router;