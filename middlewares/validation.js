const { BadRequest } = require("http-errors");

function validation(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    console.log(error);

    if (error) {
      next(new BadRequest("missing required name field"));
    }
    next();
  };
}

module.exports = {
  validation,
};
