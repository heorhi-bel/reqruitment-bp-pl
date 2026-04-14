import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "messages",
  timestamps: true,
});

export default Message;