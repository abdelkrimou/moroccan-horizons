const User = require('../models/userModel');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only images !!', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  const filePath = path.join(
    __dirname,
    '../../client/public/user-images',
    req.file.filename
  );

  try {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(filePath);

    console.log('Image processing complete');
  } catch (err) {
    console.log('Error processing image:', err.message);
  }
  next();
});

const filterObj = (obj, ...allowedFileds) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1 create Error if user post password Data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route in not for updating the password,Please use /updateMyPassword',
        400
      )
    );
  }
  // 2 filtered Out unwanted fields
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  //3 Update User Document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.user._id);
  // if (!deletedUser) return next(new AppError('Please log in', 401));
  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This Route is not defind, Please use /signup url ',
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.deleteUser = deleteOne(User);
// Do not update passwords with this method
exports.updateUser = updateOne(User);
