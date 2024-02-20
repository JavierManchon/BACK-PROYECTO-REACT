import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { config, v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Obtén la ruta del directorio base utilizando import.meta.url
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

dotenv.config();

config({
  cloud_name: 'dbckjkikz',
  api_key: '523154699687456',
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        console.log('filename ->', file);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
});

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        const error = new Error('Invalid file type');
        cb(error);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        try {
            const filePath = req.file.path;
            const image = await cloudinary.uploader.upload(filePath);

            // Borramos el archivo local
            await fs.unlinkSync(filePath);

            // Añadimos la propiedad file_url a nuestro Request
            req.file_url = image.secure_url;
            return next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
};

export { upload, uploadToCloudinary };