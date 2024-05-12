import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import Contacts from '../models/contacts.js';

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const contacts = await Contacts.find();
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
  const result = await Contacts.create(contact);
  res.status(201).send(result);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  const result = await Contacts.findByIdAndUpdate(id, contact);
  if (!contact) {
    throw HttpError(404);
  }
  if (Object.keys(contact).length === 0) {
    return res
      .status(400)
      .json({ message: 'Body must have at least on field' });
  }

  res.send(result);
});

export const updeteStatusContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  const result = await Contacts.findByIdAndUpdate(id, contact);
  if (!contact) {
    throw HttpError(404);
  }
  if (Object.keys(contact).length === 0) {
    return res
      .status(400)
      .json({ message: 'Body must have at least on field' });
  }

  res.send(result);
});
