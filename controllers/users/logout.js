const { User } = require("../../models/user");
const createHttpError = require("../../utils/createHttpError");

async function logout(req, res) {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    createHttpError(401);
  }

  await User.findByIdAndUpdate(_id, { token: "" }, { new: true });

  res.status(204).json();
}

module.exports = {
  logout,
};
