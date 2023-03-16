const multer = require("multer");

const handleFileUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "File size exceeds limit" });
    }
    return res.status(400).json({ message: "Bad request" });
  } if (err) {
    return res.status(500).json({ message: "Server error" });
  }
  return next();
};

module.exports = handleFileUploadErrors;
