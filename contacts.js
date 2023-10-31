const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { log } = require("node:console");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
async function listContacts() {
  return await readContacts();
}

async function getContactById(contactId) {
  const data = await readContacts();
  const contact = data.find((contact) => contact.id === contactId);
  return contact || null;
}
async function addContact(name, email, phone) {
  const data = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  data.push(newContact);

  await writeContacts(data);
  return newContact;
}
async function updateContact(id, name, email, phone) {
  const data = await readContacts();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  data[index] = {
    id,
    name: name || data[index].name,
    email: email || data[index].email,
    phone: phone || data[index].phone,
  };

  await writeContacts(data);
  return data[index];
}
async function removeContact(contactId) {
  const data = await readContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  data.splice(index, 1);
  await writeContacts(data);
  return data[index];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
