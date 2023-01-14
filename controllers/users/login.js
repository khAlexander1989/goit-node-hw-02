const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createHttpError = require("../../utils/createHttpError");

const { SECRET_KEY } = process.env;

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, "Email or password is wrong");
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    throw createHttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const loggedinUser = await User.findByIdAndUpdate(
    payload.id,
    { token },
    { new: true }
  );

  console.log("loggedinUser", loggedinUser);

  res.status(201).json({
    token: loggedinUser.token,
    user: {
      email: loggedinUser.email,
      subscription: loggedinUser.subscription,
    },
  });
}

module.exports = {
  login,
};
