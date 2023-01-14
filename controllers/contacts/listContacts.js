const { Contact } = require("../../models/contact");

async function listContacts(req, res) {
  const { _id: owner } = req.user;
  const { favorite = null, page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;
  const filter = {};

  if (favorite !== null) {
    filter.favorite = favorite;
  }

  const result = await Contact.find(
    { owner, ...filter },
    "name email phone favorite owner",
    { skip, limit }
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
