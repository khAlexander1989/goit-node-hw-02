const contactsOperations = require("../../models/contacts");

async function listContacts(req, res) {
  const result = await contactsOperations.listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = {
  listContacts,
};
