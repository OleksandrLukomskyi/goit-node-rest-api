import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

export const authMiddleware = ctrlWrapper(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (typeof authorizationHeader === 'undefined') {
    throw HttpError(401, 'Not authorized');
  }
  const [bearer, token] = authorizationHeader.split(' ', 2);

  if (bearer !== 'Bearer') {
    throw HttpError(401, 'Not authorized');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (user === null) {
    throw HttpError(401, 'Not authorized');
  }
  if (user.token !== token) {
    throw HttpError(401, 'Not authorized');
  }

  req.user = user;
  next();
});
