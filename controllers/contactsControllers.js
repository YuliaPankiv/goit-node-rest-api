import {
  addContact,
  getById,
  listContacts,
  removeContact,
  updateById,
} from "../services/contactsServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = ctrlWrapper(async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json({ msg: "Success", contacts });
});

export const getContactById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await getById(id);
  if (!result) throw HttpError(404, "Not found");
  res.status(200).json({ msg: "Success!", result });
});

export const createContact = ctrlWrapper(async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json({ msg: "Success", contact: newContact });
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedContact = await removeContact(id);
  if (!deleteContact) throw HttpError(404, "Not found");

  res.status(200).json({ msg: "Delete success", deletedContact });
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await updateById(id, req.body);
  if (!contact) throw HttpError(404, "Not found");

  res.json(contact);
});
