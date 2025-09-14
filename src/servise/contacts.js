import { Contact } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userID: userId });

  if (filter.gender) {
    contactsQuery.where('gender').equals(filter.gender);
  }
  if (filter.maxAge) {
    contactsQuery.where('age').lte(filter.maxAge);
  }
  if (filter.minAge) {
    contactsQuery.where('age').gte(filter.minAge);
  }
  if (filter.maxAvgMark) {
    contactsQuery.where('avgMark').lte(filter.maxAvgMark);
  }
  if (filter.minAvgMark) {
    contactsQuery.where('avgMark').gte(filter.minAvgMark);
  }

  const contactCount = await Contact.countDocuments({ userID: userId });
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, userID: userId });
    return contact;
  } catch (error) {
    console.error('❌ Ошибка при поиске контакта:', error.message);
    return null;
  }
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create({ ...payload, userID: userId });
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userID: userId,
  });
  return contact;
};

export const upsertContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userID: userId },
    payload,
    { new: true, ...options },
  );

  if (!contact) {
    return null;
  }

  return {
    contact,
    isNew: false,
  };
};
