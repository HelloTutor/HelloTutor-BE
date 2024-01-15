const router = require("express").Router();
const tutorController = require("../controller/tutor.controller");

router.get("/:tutorId", tutorController.selectTutor);
router.get("/:tutorId/info", tutorController.selectTutorInfo);

module.exports = router;