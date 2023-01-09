const { validation } = require("./validation");
const { ctrlWrapper } = require("./ctrlWrapper");
const { validateId } = require("./validateId");
const { authenticate } = require("./authtenticate");

module.exports = {
  validation,
  ctrlWrapper,
  validateId,
  authenticate,
};
