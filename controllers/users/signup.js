const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const createHttpError = require("../../utils/createHttpError");
const { sendEmail } = require("../../utils");

async function signup(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createHttpError(409, "Email in use.");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const avatarURL = gravatar.url(email);

  try {
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const { BASE_URL } = process.env;

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verifyEmail);

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
