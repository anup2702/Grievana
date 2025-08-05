import multer from "multer";
import sharp from "sharp";
import path from "path";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const compressImage = async (req, res, next) => {
  if (!req.file) return next();

  req.body.image = await sharp(req.file.buffer)
    .resize(800)
    .jpeg({ quality: 80 })
    .toBuffer();

  next();
};

export default upload;
