import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";

export const verifyToken = (req, res, next) => {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = tokenHeader.split(' ')[1];

  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');  
    },
    filename: (req, file, cb) => {
       
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;
