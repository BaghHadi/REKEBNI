const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRoutes");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

//router.use("/:userId/reviews", reviewRouter);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(reviewController.setConducteurUserIds, reviewController.createReview);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
