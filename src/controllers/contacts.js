import createHttpError from 'http-errors';

import * as contactsServices from '../services/contacts.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/contact.js';

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });

  const data = await contactsServices.getContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
  // const data = await contactsServices.getAllContacts();
  // res.json({ status: 200, message: 'Successfully found contacts!', data });
};

export const getContactByIdController = async (req, res) => {
  const id = req.params.id;
  const data = await contactsServices.getContactById(id);
  if (!data) {
    throw createHttpError(404, `404, Contact not found!`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await contactsServices.createContact(req.body);
  res
    .status(201)
    .json({ status: 201, message: 'Successfully created a contact!', data });
};

export const pathContactController = async (req, res) => {
  const id = req.params.id;
  const data = await contactsServices.updateContact({ _id: id }, req.body);
  if (!data) {
    throw createHttpError(404, `404, Contact not found!`);
  }
  res.json({ status: 200, message: 'Successfully patched a contact!', data });
};

export const deleteContactController = async (req, res) => {
  const id = req.params.id;
  const data = await contactsServices.deleteContact({ _id: id });
  if (!data) {
    throw createHttpError(404, `404, Contact not found!`);
  }
  res.status(204).send();
};
