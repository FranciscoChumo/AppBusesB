import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
import { PersonsModel } from "../models/PersonsModel.js";

export const updateP=async(req,res)=>{
const {name, lastname, ci, address,phone}=req.body;
if(!(name||lastname||ci||address||phone)){
    res.status(400).json({ message: "all input is required" });
}
const person=await PersonsModel.findOne({where:{id:req.params.id}});
if(!person){
    person.set({...person,name:name,lastname:lastname, ci:ci,address:address,phone:phone})
    await person.save();
    res.status(200).json({message:"update"});
}else{
    res.status(404).json({message: "user not found"});
}
};