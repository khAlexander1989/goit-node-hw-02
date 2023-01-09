const { BadRequest } = require("http-errors");

function validation(schema, errorMsg) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(new BadRequest(errorMsg));
    }
    next();
  };
}

module.exports = {
  validation,
};
