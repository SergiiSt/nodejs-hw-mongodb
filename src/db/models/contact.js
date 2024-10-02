import { Schema, model } from 'mongoose';
import { contactTypeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateOptions } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      default: 'personal',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleSaveError);
contactSchema.post('findOneAndUpdate', handleSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateOptions);

const ContactCollection = model('contact', contactSchema);
export const sortFields = ['name', 'email', 'isFavourite'];

export default ContactCollection;
