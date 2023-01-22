const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "tmp"),
  filename: (req, file, cb) => {
    const { _id } = req.user;
    const [, extention] = file.originalname.split(".");

    const fileName = `user_${_id}_avatar.${extention}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
