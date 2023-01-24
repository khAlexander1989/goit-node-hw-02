const { login } = require("./login");
const { logout } = require("./logout");
const { signup } = require("./signup");
const { getCurrent } = require("./getCurrent");
const { verifyEmail } = require("./verifyEmail");
const { updateAvatar } = require("./updateAvatar");
const { updateSubscription } = require("./updateSubscription");
const { resendVerificationEmail } = require("./resendVerificationEmail");

module.exports = {
  login,
  logout,
  signup,
  getCurrent,
  verifyEmail,
  updateAvatar,
  updateSubscription,
  resendVerificationEmail,
};
