const { User } = require("../../models/user");
const createHttpError = require("../../utils/createHttpError");
const { sendEmail } = require("../../utils");

async function resendVerificationEmail(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, "User with this email not exist");
  }

  const { verify, verificationToken } = user;

  if (verify) {
    throw createHttpError(400, "Verification has already been passed");
  }

  const { BASE_URL } = process.env;

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
}

module.exports = {
  resendVerificationEmail,
};
