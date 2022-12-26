const { Contact } = require("../../models/contact");

async function listContacts(_, res) {
  const result = await Contact.find({}, "name email phone");
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
