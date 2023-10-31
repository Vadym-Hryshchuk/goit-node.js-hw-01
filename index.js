const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("./contacts.js");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;
    case "update":
      const updatedContact = await updateContact(id, name, email, phone);
      console.log(updatedContact);
      break;
    case "remove":
      const removedContact = await removeContact(id, name, email, phone);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
