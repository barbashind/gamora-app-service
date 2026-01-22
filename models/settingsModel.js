import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
export const Users = db.define('users',{
    
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
    

},{
    freezeTableName: true
});