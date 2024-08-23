const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const {
  getAll,
  updateOne,
  createOne,
  deleteOne,
  getOne,
} = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1 ) Get the currently booked tour and quantity
  const tour = await Tour.findById(req.params.tourId);
  const quantity = req.params.quantity;
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  if (isNaN(quantity) || quantity < 1) {
    return next(new AppError('Invalid quantity', 400));
  }
  // 2 ) create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    //success_url: `${req.protocol}://${req.get('host')}/`,
    // success_url: `${req.protocol}://${req.get('host')}/tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    success_url: `http://127.0.0.1:5173`,

    // cancel_url: `${req.protocol}://${req.get('host')}/${tour.nameSlug}`,
    cancel_url: `http://127.0.0.1:5173/${tour.nameSlug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tour/${req.params.tourId}`],
          },
        },
        quantity: +quantity,
      },
    ],
  });

  res.status(200).json({ status: 'success', session });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // this is only temporary,no one should know about this req url cause they may reach it wihtout really pay the tour
  const { tour, user, price } = req.query;
  if (!tour || !user || !price) return next();

  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
});
exports.getMyBooking = catchAsync(async (req, res, next) => {
  const myBookings = await Booking.find({ user: req.user.id });
  if (!myBookings)
    return new AppError('There was an issue uploading your booking', 404);

  res.status(200).json({
    status: 'success',
    result: myBookings.length,
    data: myBookings,
  });
});
exports.getAllBookings = getAll(Booking);
exports.getBooking = getOne(Booking);
exports.updateBooking = updateOne(Booking);
exports.createBooking = createOne(Booking);
exports.deleteBooking = deleteOne(Booking);
