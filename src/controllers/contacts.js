import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  upsertContact,
} from '../servise/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
export const getAllContactsController = async (req, res, next) => {
  try {
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const { page, perPage } = parsePaginationParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
      userId: req.user._id,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId, req.user._id);
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found contact!',
    data,
  });
};

export const createStudentController = async (req, res) => {
  const student = await createContact(req.body, req.user._id);
  res.status(201).json({
    status: 201,
    message: 'Student created',
    data: student,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Contact deleted',
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await upsertContact(contactId, req.body, req.user._id, {
    upsert: true,
  });
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await upsertContact(contactId, req.body, req.user._id); // <- userId
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully updated a contact!`,
    data: result.contact,
  });
};

export const getContactsController = async (req, res, next) => {
  try {
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const { page, perPage } = parsePaginationParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId: req.user._id,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};
