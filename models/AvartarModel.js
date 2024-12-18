import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
export const AvatarModel = sequelize.define(
  "avatars",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  
    url:{
      type: DataTypes.STRING,
      allowNull:false
    }
  },
  {
    timestamps: false,
  }
);