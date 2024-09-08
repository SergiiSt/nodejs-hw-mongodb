import ContactCollection from '../db/models/contact.js';

export const getAllContacts = () => ContactCollection.find();
export const getContactById = (id) => ContactCollection.findById(id);
