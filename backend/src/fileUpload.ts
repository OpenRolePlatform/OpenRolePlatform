import multer from "multer";
import path from "path";

export const upload = multer({
  //limits: 800000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload/images");
    },
    filename: (req, file, cb) => {
      let filename = path.parse(file.originalname);
      console.log(filename);
      cb(null, `${filename.name + "-" + Date.now()}${filename.ext}`);
    },
  }),
  /* fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpg", "jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }, */
});

export default upload;
