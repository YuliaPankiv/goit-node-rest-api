import fs from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = "./db/contacts.json";

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const res = JSON.parse(data);

  return res;
};

export const getById = async (id) => {
  const data = await listContacts();
  const res = data.find((el) => el.id === id);

  return res || null;
};

export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(20),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

export const updateById = async (id, data) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((el) => el.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

export const removeContact = async (id) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((el) => el.id === id);
  console.log(index, "contacts[index]");

  if (index === -1) {
    return null;
  }
  const [res] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};
