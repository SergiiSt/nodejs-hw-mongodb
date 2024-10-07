import ContactCollection from '../db/models/contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/sotrOrder.js';

export const getContacts = async ({
  userId,
  perPage,
  page,
  sortBy = 'name',
  sortOrder = SORT_ORDER[0],
}) => {
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find({ userId });
  console.log(userId);

  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const count = await ContactCollection.find({ userId }).countDocuments();
  const paginationData = calculatePaginationData({ count, perPage, page });

  return {
    contacts,
    page,
    perPage,
    totalItems: count,
    ...paginationData,
  };
};
export const getContactById = (filter) => ContactCollection.findOne(filter);
export const createContact = (payload) => ContactCollection.create(payload);
export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    // isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
