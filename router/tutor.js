const router = require("express").Router();
const tutorController = require("../controller/tutor.controller");
const authorization = require("../middleware/authorization");

router.get("/:tutorId", tutorController.selectTutor);

router.get("/:tutorId/info", tutorController.selectTutorInfo);

router.post("/:tutorId/favorite", authorization.reIssueToken, tutorController.)

module.exports = router;