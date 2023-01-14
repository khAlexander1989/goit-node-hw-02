const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

async function getById(req, res) {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  // const contact = await Contact.findById(contactId);
  const contact = await Contact.findOne({ owner, _id: contactId }).populate(
    "owner",
    "email subscription"
  );

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
