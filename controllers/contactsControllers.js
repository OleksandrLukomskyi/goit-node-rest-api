import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import Contacts from '../models/contacts.js';

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await Contacts.find({ owner });
  res.send(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await Contacts.findById(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.send(contact);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await Contacts.findByIdAndDelete(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.send(contact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const { _id: owner } = req.user;

  const result = await Contacts.create({ ...contact, owner });
  res.status(201).send(result);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  const contact = {
    name,
    email,
    phone,
    favorite,
  };

  if (!name && !email && !phone && !favorite) {
    return res.status(400).json({
      message: 'Request body is empty or does not contain any properties',
    });
  }
  const result = await Contacts.findByIdAndUpdate(id, contact, { new: true });
  if (!result) {
    throw HttpError(404);
  }

  res.send(result);
});

export const updeteStatusContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  const contact = {
    name,
    email,
    phone,
    favorite,
  };
  if (!name && !email && !phone && !favorite) {
    return res.status(400).json({
      message: 'Request body is empty or does not contain any properties',
    });
  }
  const result = await Contacts.findByIdAndUpdate(id, contact, { new: true });
  if (!result) {
    throw HttpError(404);
  }

  res.send(result);
});
