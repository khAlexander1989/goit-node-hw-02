const { Contact } = require("../../models/contact");

async function listContacts(req, res) {
  const { _id: owner } = req.user;
  const result = await Contact.find(
    { owner },
    "name email phone, owner"
  ).populate("owner", "email subscription");
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
