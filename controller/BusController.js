import { BusModel } from "../models/busModel.js";
export const getBuss = async (req,res)=>{
  try{
    const bus=await BusModel.findAll({
      attributes:['id','buss','Number','departure_time','arrival_time']
    },{where:{state:true}});
    res.status(200).json({bus});
  }catch(error){
    res.status(500).json({ error: error.message });
  }
};
export const createBus = async (req, res) => {
  try {
    const { buss, Number, departure_time, arrival_time } = req.body;
    console.log("Datos recibidos:", req.body);

    if (!buss || !Number || !departure_time || !arrival_time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verifica si el archivo se ha subido correctamente
    const image = req.file ? req.file.filename : null;
    console.log("Imagen subida:", image);

    const newBus = await BusModel.create({
      buss,
      Number,
      departure_time,
      arrival_time,
      image,
    });

    res.status(201).json({
      message: "Bus created successfully",
      bus: newBus,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error uploading image or creating bus record",
      details: error.message,
    });
  }
};
export const updateBus = async (req, res) => {
  const { buss } = req.body;
  if (!(buss)) {
    res.status(400).json({ message: "bus is required" });
  }
  const Buss = await BusModel.findOne({where:{id:req.params.id}});
  if(Buss){
    Buss.set({...Buss,buss:buss});
      await Buss.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const updateBusNumber = async (req, res) => {
  const { Number } = req.body;
  if (!(Number)) {
    res.status(400).json({ message: "Number is required" });
  }
  const oldUser = await BusModel.findOne({ where: { Number: Number } });
  if (oldUser) {
    return res.status(409).json("Number already exist");
  }
  const userD = await BusModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,Number:Number});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const updateBuss_time = async (req, res) => {
  const { departure_time } = req.body;
  if (!(departure_time)) {
    res.status(400).json({ message: "departure_time is required" });
  }
  const userD = await BusModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,departure_time:departure_time});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const update_arrival_time = async (req, res) => {
  const { arrival_time } = req.body;
  if (!(arrival_time)) {
    res.status(400).json({ message: "arrival_time is required" });
  }
  const userD = await BusModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,arrival_time:arrival_time});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const deleteBus = async (req, res) => {
  const buss = await BusModel.findOne({ where: { id: req.params.id } });
  if (buss) {
    buss.set({ ...buss, state: false });
    await user.save();
    res.status(200).json({ message: "delete" });
  } else {
    res.status(404).json({ message: "type not found" });
  }
};