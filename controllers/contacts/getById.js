const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

async function getById(req, res) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

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
