import createHttpError from 'http-errors';

import * as contactsServices from '../services/contacts.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/contact.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

const enableCloudinary = env('ENABLE_CLOUDINARY');

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const { _id: userId } = req.user;

  const data = await contactsServices.getContacts({
    userId,
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
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactsServices.getContactById({ _id: id, userId });
  if (!data) {
    throw createHttpError(404, `404, Contact not found!`);
    // res.json({
    //   status: 200,
    //   message: `Contact with ${id} not found!`,
    //   data,
    // });
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  let photo;
  if (req.file) {
    if (enableCloudinary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'photo');
    } else {
      photo = await saveFileToUploadDir(req.file);
    }
  }

  const { _id: userId } = req.user;
  const data = await contactsServices.createContact({
    ...req.body,
    userId,
    photo,
  });

  res.status(201).json({
    status: 201,
    message: 'Contact add successfully!',
    data,
  });
};

export const pathContactController = async (req, res) => {
  let photo;
  if (req.file) {
    if (enableCloudinary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'photo');
    } else {
      photo = await saveFileToUploadDir(req.file);
    }
  }

  const id = req.params.id;
  const { _id: userId } = req.user;
  const result = await contactsServices.updateContact(
    { _id: id, userId },
    {
      ...req.body,
      userId,
      photo,
    },
  );

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Contact patched successfully!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const id = req.params.id;
  const { _id: userId } = req.user;
  const data = await contactsServices.deleteContact(
    { _id: id, userId },
    req.body,
  );
  if (!data) {
    throw createHttpError(404, `404, Contact not found!`);
  }
  res.status(204).send();
};
