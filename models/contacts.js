const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const { serializeData, deserializeData } = require("../utils");

const contactPath = path.join(__dirname, "./contacts.json");

// Функция получения списка контактов

async function listContacts() {
  try {
    const rawData = await fs.readFile(contactPath);
    return deserializeData(rawData.toString());
  } catch {
    return null;
  }
}

// Функция получения контакта по его id

async function getContactById(contactId) {
  const contacts = await listContacts();
  return (
    contacts.find((contact) => contact.id === contactId?.toString()) || null
  );
}

// Функция удаления контакта по его id

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(
    (contact) => contact.id === contactId?.toString()
  );

  if (contactIdx === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(contactIdx, 1);

  try {
    await fs.writeFile(contactPath, serializeData(contacts));
    return deletedContact;
  } catch {
    return null;
  }
}

// Функция добвления контакта

async function addContact({
  name = "unknown",
  email = "unknown",
  phone = "unknown",
}) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  try {
    await fs.writeFile(contactPath, serializeData(contacts));
    return newContact;
  } catch {
    return null;
  }
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (contact) => contact.id === contactId?.toString()
  );

  if (idx === -1) {
    return null;
  }

  const updatedContact = {
    ...contacts[idx],
    ...body,
  };

  contacts[idx] = updatedContact;

  try {
    await fs.writeFile(contactPath, serializeData(contacts));
    return updatedContact;
  } catch {
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
