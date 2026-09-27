const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function imageFileFilter(req, file, callback) {
  if (!allowedMimeTypes.has(file.mimetype)) {
    return callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPEG, PNG, WebP, and GIF images are allowed.'));
  }
  callback(null, true);
}

var mystore = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${uuidv4()}${extension}`);
  },
});
const upload = multer({
  storage: mystore,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }
});
module.exports = upload;
