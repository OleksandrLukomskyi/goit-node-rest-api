import multer from 'multer';
import path from 'node:path';

const multerConfig = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve('tmp'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

export default upload;
