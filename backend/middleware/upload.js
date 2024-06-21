// middleware/upload.js
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 최대 5MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type, only JPEG, PNG, and GIF is allowed!"),
        false
      );
    }
  },
});

const uploadImages = upload.array("images", 5); // 'images' 필드에서 최대 5개의 파일 허용

export default uploadImages;
