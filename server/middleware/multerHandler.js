import multer from "multer";
import path from "path";

const storageForUser = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./server/public/user-image");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const storageForPostsCover = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./server/public/post-cover");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const storageForPost = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./server/public/post-image");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadForUser = multer({ storage: storageForUser });
const uploadForPostCover = multer({ storage: storageForPostsCover });
const uploadForPost = multer({ storage: storageForPost });

export { uploadForUser, uploadForPostCover, uploadForPost };
