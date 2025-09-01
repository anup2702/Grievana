import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const compressImage = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `complaint-${Date.now()}.jpeg`;
  const uploadsDir = path.join("backend", "uploads");
  const filepath = path.join(uploadsDir, filename);

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  await sharp(req.file.buffer)
    .resize(800)
    .jpeg({ quality: 80 })
    .toFile(filepath);

  req.body.image = filename;

  next();
};

export default upload;