import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Connection = db.define('connections',{
    connectionId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pointId:{
        type: DataTypes.INTEGER,
    },
    time:{
        type: DataTypes.INTEGER,
    },
    losses:{
        type: DataTypes.INTEGER,
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }

},{
    freezeTableName: true
});
 
export default Connection;