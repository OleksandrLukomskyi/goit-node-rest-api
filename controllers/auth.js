import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = ctrlWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();
  const user = await User.findOne({ email: emailInLowerCase });
  if (user !== null) {
    throw HttpError(409);
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email: emailInLowerCase,
    password: passwordHash,
    subscription: 'starter',
  });

  res.status(201).send({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
});

export const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  const user = await User.findOne({ email: emailInLowerCase });
  if (user === null) {
    throw HttpError(401);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch === false) {
    throw HttpError(401);
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '23h' }
  );
  await User.findByIdAndUpdate(user._id, { token });

  res.send({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const logout = ctrlWrapper(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { token: null });
  res.status(204).send();
});

export const getCurrent = ctrlWrapper(async (req, res) => {
  const { email, subscription } = req.user;

  res.send({ email, subscription });
});
