import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

const compressImage = async (req, res, next) => {
  try {
    if (!req.file) {
      console.log("No file uploaded, skipping compression");
      return next();
    }

    console.log("Compressing image - File details:");
    console.log("  Original name:", req.file.originalname);
    console.log("  MIME type:", req.file.mimetype);
    console.log("  Size:", req.file.size, "bytes");
    console.log("  Buffer length:", req.file.buffer?.length || "No buffer");

    const filename = `complaint-${Date.now()}.jpeg`;
    const uploadsDir = path.join(__dirname, "..", "uploads");
    const filepath = path.join(uploadsDir, filename);

    console.log("Upload directory:", uploadsDir);
    console.log("File path:", filepath);

    // Check if uploads directory exists and is writable
    try {
      if (!fs.existsSync(uploadsDir)) {
        console.log("Creating uploads directory");
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Test write permissions
      const testFile = path.join(uploadsDir, 'test.tmp');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      console.log("Directory is writable");
    } catch (dirError) {
      console.error("Directory access error:", dirError);
      return next(new Error(`Cannot write to uploads directory: ${dirError.message}`));
    }

    // Validate image buffer
    if (!req.file.buffer || req.file.buffer.length === 0) {
      console.error("Invalid image buffer");
      return next(new Error("Invalid image file"));
    }

    console.log("Starting Sharp compression...");

    // Compress and save the image
    await sharp(req.file.buffer)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 })
      .toFile(filepath);

    console.log("Image compressed and saved successfully:", filename);

    // Verify file was created
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath);
      console.log("Saved file size:", stats.size, "bytes");
    } else {
      console.error("File was not created");
      return next(new Error("Failed to save image file"));
    }

    req.body.image = filename;
    next();
  } catch (error) {
    console.error("Error in image compression:", error);
    console.error("Error stack:", error.stack);

    // Provide more specific error messages
    if (error.message.includes('Input buffer contains unsupported image format')) {
      return next(new Error("Unsupported image format. Please use JPEG, PNG, or WebP."));
    } else if (error.message.includes('Input image is too large')) {
      return next(new Error("Image file is too large to process."));
    } else if (error.message.includes('Cannot read property')) {
      return next(new Error("Invalid image file format."));
    }

    return next(new Error(`Image processing failed: ${error.message}`));
  }
};

export { compressImage };
export default upload;
