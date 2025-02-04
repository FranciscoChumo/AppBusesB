import express from 'express';
import  {verifyToken}  from '../middleware/auth.js';
import { updateP,changeImage } from '../controller/PersonsController.js';
import multer from 'multer';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/personas')
    },
    filename: function (req, file, cb) {
       const { id } = req.params; 
        cb(null,  id +"-"+file.originalname );
    }
  });
  var upload = multer({ storage: storage });

const rotuer = express.Router();

rotuer.put('/person/:id',verifyToken, updateP);
rotuer.put('/update/image/:id', upload.single("file"), changeImage);

export const RouterPerson = rotuer;
