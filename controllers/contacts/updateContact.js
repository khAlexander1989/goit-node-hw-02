const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts");

async function updateContact(req, res) {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);

  if (!result) {
    throw new NotFound();
  }

  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      result,
    },
  });
}

module.exports = {
  updateContact,
};
