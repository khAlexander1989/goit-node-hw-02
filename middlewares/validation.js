const createHttpError = require("../utils/createHttpError");

function validation(
  schema,
  errorMsg = "Ошибка от Joi или другой библиотеки валидаци"
) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(createHttpError(400, errorMsg));
    }
    next();
  };
}

module.exports = {
  validation,
};
