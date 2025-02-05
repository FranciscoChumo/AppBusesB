import express from 'express';
import multer from 'multer'; 
import { createBus, deleteBus, getBuss,getBusById, searchBus, updateBus, ImageBus } from '../controller/BusController.js';


const rotuer = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especificamos la carpeta de destino para las imágenes subidas
      cb(null, './public/uploads/bus');
    },
    filename: (req, file, cb) => {
      // Especificamos el nombre del archivo con la fecha actual y el nombre original
      const{id}= req.params;
      cb(null, id+"-"+file.originalname);
    },
  });
var upload = multer({ storage: storage }); // Middleware de multer

rotuer.post('/registerbus', upload.single('image'), createBus);  
rotuer.get('/bus',  getBuss);
rotuer.delete('/bus/:id',  deleteBus);
rotuer.put('/bus/:id',  updateBus);
rotuer.post('/Search/bus',searchBus);
rotuer.get("/bus/:id", getBusById);
rotuer.put("/bus/:id/image", upload.single("file"), ImageBus);
export const RouterBus = rotuer;
 