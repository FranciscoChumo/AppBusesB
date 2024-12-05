import express from 'express';
import  {verifyToken}  from '../middleware/auth.js';
import { updateP } from '../controller/PersonsController.js';
const rotuer = express.Router();
rotuer.put('/person/:id',verifyToken, updateP);
export const RouterPerson = rotuer;
