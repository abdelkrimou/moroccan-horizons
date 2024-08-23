const mongoose = require('mongoose');
const Tour = require('./tourModel');
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, ' A review must not be empty'],
    },
    rating: {
      type: Number,
      required: [true, 'What do you think the rate should be ?!'],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must belong to a Tour '],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must be created by a User '],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//Indexes
reviewSchema.index({ user: 1, tour: 1 }, { unique: true });
// Middlewares
reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'tour',
  //     select: 'name',
  //   })
  this.populate({
    path: 'user',
    select: 'name photo',
  }).populate({ path: 'tour', select: 'name' });
  next();
});

// Calculate AvrRatings and Rating Quantity
// reviewSchema.statics.calcAverageRatings = async function (tourId) {
//   const stats = await this.aggregate([
//     {
//       $match: { tour: tourId },
//     },
//     {
//       $group: {
//         _id: '$tour',
//         nRating: { $sum: 1 },
//         avgRating: { $avg: '$rating' },
//       },
//     },
//   ]);
//   await Tour.findByIdAndUpdate(tourId, {
//     ratingsAverage: stats[0].avgRating,
//     ratingsQuantity: stats[0].nRating,
//   });
// };
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  try {
    const stats = await this.aggregate([
      {
        $match: { tour: tourId },
      },
      {
        $group: {
          _id: '$tour',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    if (stats.length > 0) {
      await Tour.findByIdAndUpdate(tourId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: Math.round(stats[0].avgRating * 10) / 10,
      });
    } else {
      await Tour.findByIdAndUpdate(tourId, {
        ratingsQuantity: 0,
        ratingsAverage: 4.5, // Or whatever default value you prefer
      });
    }
  } catch (err) {
    console.error('Error calculating average ratings:', err);
  }
};
reviewSchema.post('save', async function () {
  // `this` points to the current review document
  await this.constructor.calcAverageRatings(this.tour);
});
reviewSchema.post(/^findOneAnd/, async function (doc) {
  // doc points to current document
  if (doc) await doc.constructor.calcAverageRatings(doc.tour);
});
// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   const r = await this.findOne();
//   console.log(r);
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
