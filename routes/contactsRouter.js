import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updeteStatusContact,
} from '../controllers/contactsControllers.js';

import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import { authMiddleware } from '../middleware/auth.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authMiddleware, getAllContacts);

contactsRouter.get('/:id', authMiddleware, getOneContact);

contactsRouter.delete('/:id', authMiddleware, deleteContact);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  authMiddleware,
  createContact
);

contactsRouter.put(
  '/:id',
  validateBody(updateContactSchema),
  authMiddleware,
  updateContact
);
contactsRouter.patch('/:id/favorite', authMiddleware, updeteStatusContact);

export default contactsRouter;
