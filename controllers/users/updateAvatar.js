const path = require("path");
const fs = require("fs/promises");

const { processAvatar } = require("../../utils");
const { User } = require("../../models/user");

async function updateAvatar(req, res) {
  const avatarDir = path.join(__dirname, "..", "..", "public", "avatars");
  const { path: srcPath, filename } = req.file;
  const destPath = path.join(avatarDir, filename);

  const { _id: userId } = req.user;

  try {
    await processAvatar(srcPath);

    await fs.rename(srcPath, destPath);

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(userId, { avatarURL });

    res.status(201).json({ avatarURL });
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  updateAvatar,
};
