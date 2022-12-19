const contactsOperations = require("../../models/contacts");

async function addContact(req, res) {
  const newContact = await contactsOperations.addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
}

module.exports = {
  addContact,
};
