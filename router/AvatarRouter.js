import multer from 'multer';
import path from 'path';
import fs from 'fs';
import  {verifyToken}  from '../middleware/auth.js';
import express from 'express';
import { saveAvatar, getAvatar, getAvatarAll } from '../controller/AvatarController.js';
import {UserModel} from '../models/UserModel.js';  
const __dirname = path.resolve();
const router = express.Router();
const uploadDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); 
  },
  filename: (req, file, cb) => {
    const userId = req.user.id; 
    const fileExtension = path.extname(file.originalname); 
    cb(null, `avatar_${userId}${fileExtension}`); 
  }
});

const upload = multer({ storage: storage });

router.post('/upload', verifyToken, upload.single('avatar'), saveAvatar);


router.get('/avatar/:id', getAvatar);  

export const routerAvatar = router;
