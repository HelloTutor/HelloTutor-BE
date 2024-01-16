const router = require("express").Router();
const { checkSubject } = require("../middleware/checkSubject");
const { checkFilter } = require("../middleware/checkFilter");
const tutorBoardController = require("../controller/tutorBoard.controller");

router.get("/:subject/:filter", checkSubject, checkFilter, tutorBoardController.selectAllTutorBoard);

module.exports = router;