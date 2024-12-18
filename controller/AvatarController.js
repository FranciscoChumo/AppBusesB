import { AvatarModel } from "../models/AvartarModel.js";


export const saveAvatar = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded"
        });
    }

    const url = `http://localhost:3000/uploads/${req.file.filename}`;

    try {
        const AVATAR = await AvatarModel.create({
            url: url
        });

        return res.status(201).json({
            avatar: AVATAR,
            message: "Avatar uploaded successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error saving avatar",
            error: error.message
        });
    }
}


export const getAvatarAll = async(req, res)=>{
    try {

        const avatarsAll = await AvatarModel.findAll()

        if(!avatarsAll){
            res.status(401).json({message: 'Not foud'});
        }

        res.status(200).json({'avatars': avatarsAll});

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const getAvatar = async (req, res) => {
    try {
      const { id } = req.params;  // Obtiene el 'id' de los parámetros de la URL
  
      const avatarU = await AvatarModel.findByPk(id);  // Busca el avatar por 'id'
  
      if (!avatarU) {
        return res.status(404).json({ message: 'Avatar no encontrado' });
      }
  
      res.status(200).json({ avatar: avatarU });  // Devuelve el avatar
    } catch (error) {
      console.error('Error al obtener el avatar:', error);
      res.status(500).json({ message: 'Error al obtener el avatar' });
    }
  };
  