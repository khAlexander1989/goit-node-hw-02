const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts");

async function getById(req, res) {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);

  if (!contact) {
    throw new NotFound();
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
}

module.exports = {
  getById,
};
