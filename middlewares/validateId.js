const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

function validateId(req, res, next) {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(createError(400, `${contactId} is not correct id format`));
  }
  next();
}

module.exports = {
  validateId,
};
