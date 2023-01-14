const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

async function updateContact(req, res) {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  // const result = await Contact.findByIdAndUpdate(contactId, req.body, {
  //   new: true,
  // });
  const result = await Contact.findOneAndUpdate(
    { owner, _id: contactId },
    req.body,
    { new: true }
  );

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
