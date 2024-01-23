const router = require("express").Router();
const { checkSubject } = require("../middleware/checkSubject");
const { checkTutorSort } = require("../middleware/checkTutorSort");
const tutorBoardController = require("../controller/tutorBoard.controller");

router.get("/all", tutorBoardController.selectAllSearch);

router.get("/all/:sort", checkTutorSort, tutorBoardController.selectAllSortSearch);

router.get("/:subject", checkSubject, tutorBoardController.subjectSearch);

router.get("/:subject/:sort", checkSubject, checkTutorSort, tutorBoardController.subjectSearchSort);

module.exports = router;