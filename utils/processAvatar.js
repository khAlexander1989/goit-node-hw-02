const Jimp = require("jimp");

async function processAvatar(avatarPath) {
  try {
    const avatar = await Jimp.read(avatarPath);
    avatar.cover(250, 250).write(avatarPath);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  processAvatar,
};
