const { validation } = require("./validation");
const { ctrlWrapper } = require("./ctrlWrapper");
const { validateId } = require("./validateId");
const { authenticate } = require("./authtenticate");
const { upload } = require("./upload");

module.exports = {
  upload,
  validation,
  validateId,
  ctrlWrapper,
  authenticate,
};
