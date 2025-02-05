import { BusModel } from "../models/BusModel.js";
export const getBuss = async (req,res)=>{
  try{
    const bus=await BusModel.findAll({
      where:{state:true},
      attributes:['id','buss','Number','departure_time','arrival_time','terminal_destination','terminal_arrival','image']
    });
    res.status(200).json({bus});
  }catch(error){
    res.status(500).json({ error: error.message });
  }
};
export const getBusById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID desde la URL

    const bus = await BusModel.findOne({
      where: { id }, // Buscar el bus por ID
      attributes: ['buss', 'Number', 'departure_time', 'arrival_time', 'terminal_destination', 'terminal_arrival', 'image']
    });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({ bus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchBus=async(req, res)=>{
  try{
const{buss}=req.body;
const Bus = await BusModel.findAll({where:{buss:buss}});
res.status(200).json({Buss:Bus})
  }catch(error){
    console.log(error);
    res.status(500).json({ message:"Error search" });
  }
}

export const createBus = async (req, res) => {
  try {
    const { buss, Number, departure_time, arrival_time,terminal_destination,terminal_arrival } = req.body;
    console.log("Datos recibidos:", req.body);

    if (!buss || !Number || !departure_time || !arrival_time ||!terminal_destination ||!terminal_arrival) {
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
      terminal_destination,
      terminal_arrival,
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
  const { buss, Number,
    departure_time,
    arrival_time,
    terminal_destination,
    terminal_arrival, } = req.body;
  if (!(buss ||Number||departure_time||arrival_time||terminal_destination||terminal_arrival)) {
    res.status(400).json({ message: "bus is required" });
  }
  const Buss = await BusModel.findOne({where:{id:req.params.id}});
  if(Buss){
    Buss.set({...Buss,buss:buss, Number:Number
      ,departure_time:departure_time,
      arrival_time:arrival_time,
      terminal_destination:terminal_destination,
      terminal_arrival:terminal_arrival});
      await Buss.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const ImageBus = async (req, res) => {
  const { id } = req.params;
  const file = req.file; // Asegúrate de que se usa req.file

  if (!file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const bus = await BusModel.findOne({ where: { id } });
    if (bus) {
      bus.image = file.filename; // Actualizar solo la imagen
      await bus.save();
      return res.status(200).json({ message: "Image updated successfully", image: file.filename });
    } else {
      return res.status(404).json({ message: "Bus not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while updating the image" });
  }
};

export const deleteBus = async (req, res) => {
  const Buss = await BusModel.findOne({ where: { id: req.params.id } });
  if (Buss) {
    Buss.set({ ...Buss, state: false });
    await Buss.save();
    res.status(200).json({ message: "delete" });
  } else {
    res.status(404).json({ message: "type not found" });
  }
};