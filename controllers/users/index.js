const { signup } = require("./signup");
const { login } = require("./login");
const { logout } = require("./logout");
const { updateAvatar } = require("./updateAvatar");
const { getCurrent } = require("./getCurrent");
const { updateSubscription } = require("./updateSubscription");

module.exports = {
  login,
  logout,
  signup,
  updateAvatar,
  getCurrent,
  updateSubscription,
};
