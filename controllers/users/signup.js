const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const createHttpError = require("../../utils/createHttpError");

async function signup(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createHttpError(409, "Email in use.");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  try {
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    res.status(200).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  signup,
};
