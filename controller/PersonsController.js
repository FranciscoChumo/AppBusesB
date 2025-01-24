import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
import { PersonsModel } from "../models/PersonsModel.js";

export const updateP=async(req,res)=>{
const {name, lastname, ci, address,phone}=req.body;
if(!(name||lastname||ci||address||phone)){
    res.status(400).json({ message: "all input is required" });
}
const person=await PersonsModel.findOne({where:{id:req.params.id}});
if(person){
    person.set({...person,name:name,lastname:lastname, ci:ci,address:address,phone:phone})
    await person.save();
    res.status(200).json({message:"update"});
}else{
    res.status(404).json({message: "user not founds"});
}
};
export const changeImage = async (req, res) => {
    const { id } = req.params;
    const  file  = req.file; 
  
    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }
    try {
      const person = await PersonsModel.findOne({ where: { id } });
      if (person) {
        person.set({
          ...person, 
          photo: file.filename,
        });
        await person.save()
        return res.status(200).json({ message: "Image updated successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while updating the image" });
    }
};