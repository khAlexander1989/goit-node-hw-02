const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

function createHttpError(status, message = messages[status]) {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = createHttpError;
