import multer from 'multer';
import path from 'path';
import fs from 'fs';
import express from 'express';
import { saveAvatar, getAvatar, getAvatarAll } from '../controller/AvatarController.js';

const __dirname = path.resolve();
const router = express.Router();

const uploadDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir); // Carpeta destino
  },
  filename: (req, file, cb) => {
    cb(null, `image_${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('avatar'), saveAvatar);
router.get('/oftener/:id', getAvatar);
router.get('/obtenerAll', getAvatarAll);

export const routerAvatar = router;
