// const contactsOperations = require("../../models/contacts");
const { Contact } = require("../../models/contact");

async function addContact(req, res) {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });

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
