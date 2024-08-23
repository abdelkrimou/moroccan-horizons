const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const {
  deleteOne,
  createOne,
  updateOne,
  getOne,
  getAll,
} = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.isBooked = catchAsync(async (req, res, next) => {
  const isBooked = await Booking.findOne({
    tour: req.body.tour,
    user: req.body.user,
  });
  if (!isBooked) {
    return next(
      new AppError('You can only add review after you book the tour ')
    );
  }
  next();
});
exports.getUserReviews = catchAsync(async (req, res, next) => {
  const userReviews = await Review.find({ user: req.params.userId }).populate({
    path: 'tour',
    select: 'name',
  });
  if (!userReviews) {
    return next(
      new AppError("There is an issue with uploading user's reviews", 404)
    );
  }
  res.status(200).json({
    status: 'success',
    result: userReviews.length,
    data: {
      userReviews,
    },
  });
});

exports.getAllReviews = getAll(Review);
exports.createReview = createOne(Review);
exports.getReview = getOne(Review);
exports.deleteReview = deleteOne(Review);
exports.updateReview = updateOne(Review);
