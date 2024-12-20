const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const { webhook } = require('./controllers/bookingController');

const app = express();

// Allow requests from front end
app.use(
  cors({
    origin: 'https://moroccan-horizons-966q.vercel.app', // Replace with your frontend's URL
    credentials: true, // If you need to send cookies or auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
// 1 Global middlewares
// Set Security HTTP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'https://*.mapbox.com', 'ws:'],
        connectSrc: [
          "'self'",
          'http://127.0.0.1:8000',
          'https://api.stripe.com/',
          'ws://127.0.0.1:1234', // Add this line to allow WebSocket connections
          'https://*',
        ],
        scriptSrc: [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'https://api.mapbox.com',
          'https://js.stripe.com',
          'blob:',
        ],
        frameSrc: ["'self'", 'https://js.stripe.com'],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        fontSrc: ["'self'", 'https:', 'data:'],
        // ... other directives as needed
      },
    },
  })
);

// Webhook Route Stripe
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhook);
// Devlopement logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP , Please try again in one hour !',
});

app.use('/api', limiter);
// Body Parser ,reading data from body
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Serving Static file
// app.use('/img', express.static(path.join(__dirname, 'public/img')));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
//   });
// }
// Test middleware
app.use((req, res, next) => {
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use((req, res, next) => {
  next();
});

// routes

app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
//

//

// handle undefind routes

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// app.all('*', (req, res, next) => {
//   next(new AppError(`This url : ${req.originalUrl} is not Found`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
