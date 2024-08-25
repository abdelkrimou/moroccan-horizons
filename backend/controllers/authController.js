const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const Email = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRATION_JWT,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expiresIn: process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
  };

  res.cookie('jwt', token, cookieOptions);
  //REMOVE THE PASSWORD FROM THE DATA
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
  // await new Email(
  //   newUser,
  //   `${req.protocol}://${req.get('host')}/me`
  // ).sendWelcome();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1 Check if email and password are valid
  if (!email || !password) {
    next(new AppError('Please provide valid credentials', 400));
    return;
  }
  // 2 check if user exists & password correct

  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    next(new AppError('Incorrect Credentials !!', 401));
    return;
  }

  // 3 if everything is Okay , send the token to Client
  createSendToken(user, 200, res);
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});
exports.logout = async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({
    status: 'success',
  });
};
exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('token', token);
  if (!token)
    return next(
      new AppError('You are not logged in ,Please log in to get Access', 401)
    );
  // 2 Verificate the Token

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  // 3 Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does not exist anymore',
        401
      )
    );
  }
  // 4 Check if user had changed his password after the JWT was created
  if (await currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'The user has recently changed his password, Please log in again !!',
        401
      )
    );
  }
  // if All these phases passed then the user will have access to our Protected Data
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          'You do not have the authority to perform this action',
          401
        )
      );

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1 Get User based on Email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError(' There is no user with that email address', 404));
  // 2 Generate random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3 Send it to User's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  // const message = `Forgot your password ? Submit a patch request with your new password and passwordConfirm to: ${resetURL} .\n If you didn't forget your password , please ignore this email!`;

  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: 'Your password reset token (ONLY VALID FOR 10 min)',
    //   message,
    // });
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'Success',
      message: 'Token send to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There is an Error sending the email , please try again later !',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1 / get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const updatedUser = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2 / if token still valid , and there is user , set the new password

  if (!updatedUser) {
    return next(new AppError('Token is Invalid or Expired', 400));
  }
  updatedUser.password = req.body.password;
  updatedUser.passwordConfirm = req.body.passwordConfirm;
  updatedUser.passwordResetToken = undefined;
  updatedUser.passwordResetExpires = undefined;

  await updatedUser.save();
  // 3 / update changedpasswordAt property for the user

  // 4 / log in the user , send JWT
  createSendToken(updatedUser, 200, res);
  // const token = signToken(updatedUser._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1 get user from collection
  const updatedUser = await User.findById(req.user.id).select('+password');
  // 2 check if posted passedword is correct
  if (
    !(await updatedUser.correctPassword(
      req.body.passwordCurrent,
      updatedUser.password
    ))
  ) {
    return next(new AppError('Your current Password is wrong ', 401));
  }
  // 3 if Yes ,update the password
  updatedUser.password = req.body.password;
  updatedUser.passwordConfirm = req.body.passwordConfirm;
  await updatedUser.save();

  // User.findByIdandUpdate won't work as intended because of the middlware and validators that only excutes with save method
  // 4 log the user in with the new password hence Send JWT
  createSendToken(updatedUser, 200, res);
});

// Onlu for rendered pages , won't be any errors
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // 1 Get the token and check if it exists
  console.log('Hi from isLoggedin function');
  if (req.cookies.jwt) {
    console.log('Headers:', req.headers);
    console.log('Cookies:', req.cookies);
    try {
      // 2 Verificate the Token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET_KEY
      );
      // 3 Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // 4 Check if user had changed his password after the JWT was created
      if (await currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // if All these phases passed then the user will have access to our Protected Data
      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
});
