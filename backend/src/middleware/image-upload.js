const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs-extra");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: { fileSize: 300000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { UPLOADS_DIR } = process.env;
      fs.ensureDirSync(UPLOADS_DIR);
      cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      const fileName = `${uuidv4()}.${ext}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const err = isValid ? null : new Error("Invalid mime type");
    cb(err, isValid);
  },
});

module.exports = fileUpload;
