import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const BusModel = sequelize.define(
  "bus",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    buss: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departure_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrival_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    terminal_destination:{
      type:DataTypes.STRING,
      allowNull:false,
      },
    terminal_arrival:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  },
  {
    timestamps: false,
  }
);



