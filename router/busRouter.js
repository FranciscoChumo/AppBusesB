import express from 'express';
import multer from 'multer'; 
import fs from 'fs';
import { createBus, deleteBus, getBuss, update_arrival_time, updateBus, updateBusNumber, updateBuss_time } from '../controller/BusController.js';
import { verifyToken } from '../middleware/auth.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const rotuer = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especificamos la carpeta de destino para las imágenes subidas
      const uploadDir = join(__dirname, '/upload');
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Especificamos el nombre del archivo con la fecha actual y el nombre original
      cb(null, `image_${Date.now()}-${file.originalname}`);
    },
  });
  

const upload = multer({ storage: storage }); // Middleware de multer

rotuer.post('/registerbus', upload.single('image'), createBus);  
rotuer.get('/bus', verifyToken, getBuss);
rotuer.delete('/bus/:id', verifyToken, deleteBus);
rotuer.put('/bus/:id', verifyToken, updateBus);
rotuer.put('/bus/Number/:id', verifyToken, updateBusNumber);
rotuer.put('/bus/times/:id', verifyToken, updateBuss_time);
rotuer.put('/bus/time/:id', verifyToken, update_arrival_time);

export const RouterBus = rotuer;
