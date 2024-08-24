const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
  isBooked,
  getUserReviews,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router.use(protect);
router
  .route('/')
  .get(getAllReviews)
  // created review should be restricetd only to users
  .post(restrictTo('user'), setTourUserIds, isBooked, createReview);
router.route('/user/:userId').get(getUserReviews);
router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('admin', 'user'), deleteReview);

module.exports = router;
