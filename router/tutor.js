const router = require("express").Router();
const tutorController = require("../controller/tutor.controller");
const favoriteController = require("../controller/favorite.controller");
const reviewController = require("../controller/review.controller");
const authorization = require("../middleware/authorization");

router.get("/:tutorId", tutorController.selectTutor);

router.get("/:tutorId/info", tutorController.selectTutorInfo);

router.get("/:tutorId/reviews", reviewController.selectAllReview);

router.post("/:tutorId/favorite", authorization.reIssueToken, favoriteController.favorite);

router.post("/:tutorId/payment", authorization.reIssueToken);

module.exports = router;