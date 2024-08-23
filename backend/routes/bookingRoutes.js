const express = require('express');
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  deleteBooking,
  updateBooking,
  getBooking,
  getMyBooking,
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');
const router = express.Router();
// All routes are protected
router.use(protect);

router.get('/checkout-session/:tourId/:quantity', getCheckoutSession);
router.route('/me').get(getMyBooking);

router.use(restrictTo('admin', 'lead-guide'));
// only these routes are protected and restricted
router.route('/').get(getAllBookings).post(createBooking);

router.route('/:id').patch(updateBooking).delete(deleteBooking).get(getBooking);
module.exports = router;
