const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const createHttpError = require("../utils/createHttpError");

const { SECRET_KEY } = process.env;

async function authenticate(req, res, next) {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    createHttpError(401);
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      throw createHttpError(401);
    }

    req.user = user;
    next();
  } catch {
    next(createHttpError(401));
  }
}

module.exports = {
  authenticate,
};
