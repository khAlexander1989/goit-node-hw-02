const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

async function updateFavorite(req, res) {
  console.log("slkdjflskfkjskldfjslkjdfklsjldkfjskldjfkls");
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

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
  updateFavorite,
};
