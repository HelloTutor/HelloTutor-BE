const router = require("express").Router();
const tutorController = require("../controller/tutor.controller");
const favoriteController = require("../controller/favorite.controller");
const reviewController = require("../controller/review.controller");
const token = require("../middleware/token");

router.get("/:tutorId", tutorController.selectTutor);

router.get("/:tutorId/info", tutorController.selectTutorInfo);

router.get("/:tutorId/reviews", reviewController.selectAllReview);

router.post("/:tutorId/favorite", token.authorization, favoriteController.favorite);

module.exports = router;