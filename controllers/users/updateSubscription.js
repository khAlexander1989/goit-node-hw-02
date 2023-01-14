const { User } = require("../../models/user");

async function updateSubscription(req, res) {
  const { _id } = req.user;

  const { email, subscription } = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.status(200).json({
    user: {
      email,
      subscription,
    },
  });
}

module.exports = {
  updateSubscription,
};
