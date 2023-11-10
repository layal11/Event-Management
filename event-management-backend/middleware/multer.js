// const multer = require("multer");
import multer from "multer"; // Multer is a nodejs middleware used for uploading files.

const eventStorage = multer.diskStorage({
  //defines where files should be stored
  destination: function (req, file, callback) {
    callback(null, "./uploads/eventImages");
  },

  // add back the extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const userStorage = multer.diskStorage({
  //defines where files should be stored
  destination: function (req, file, callback) {
    callback(null, "./uploads/userImages");
  },

  // add back the extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const categoryStorage = multer.diskStorage({
  //defines where files should be stored
  destination: function (req, file, callback) {
    callback(null, "./uploads/categoryImages");
  },

  // add back the extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
//upload parameters for multer
const upload = (TYPE) => {
  switch (TYPE) {
    case "EVENT": {
      return multer({
        storage: eventStorage,
        limits: { filesize: 1024 * 1024 * 5 },
      });
      break;
    }
    case "CATEGORY": {
      return multer({
        storage: categoryStorage,
        limits: { filesize: 1024 * 1024 * 5 },
      });
      break;
    }
    case "USER": {
      return multer({
        storage: userStorage,
        limits: { filesize: 1024 * 1024 * 5 },
      });
      break;
    }
  }
};
export default upload;
