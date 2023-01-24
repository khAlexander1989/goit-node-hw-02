const { User } = require("../../models/user");
const createHttpError = require("../../utils/createHttpError");

async function verifyEmail(req, res) {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({
    message: "Verification successful",
  });
}

module.exports = {
  verifyEmail,
};
