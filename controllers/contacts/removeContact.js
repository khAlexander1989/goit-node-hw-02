const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts");

async function removeContact(req, res) {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);

  if (!result) {
    throw new NotFound();
  }

  res.status(200).json({ message: "contact deleted" });
}

module.exports = {
  removeContact,
};
