import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import contactsService from '../services/contactsServices.js';

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const contacts = await contactsService.listContacts();
  return res.status(200).json(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  if (!contact) {
    throw HttpError(404);
  }
  return res.status(200).json(contact);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id, req.body);
  if (!contact) {
    throw HttpError(404);
  }
  return res.status(200).json(contact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  return res.status(201).json(contact);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.updateContactById(id, req.body);
  if (!contact) {
    throw HttpError(404);
  }
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: 'Body must have at least on field' });
  }

  return res.status(200).json(contact);
});
