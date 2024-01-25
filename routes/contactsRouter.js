import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = Router();

contactsRouter
  .route("/")
  .post(validateBody(createContactSchema), createContact)
  .get(getAllContacts);

// contactsRouter.use("/:id", checkContactId);
contactsRouter
  .route("/:id")
  .get(getContactById)
  .delete(deleteContact)
  .put(validateBody(createContactSchema), updateContact);

export default contactsRouter;
