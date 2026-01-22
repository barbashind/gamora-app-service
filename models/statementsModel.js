import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
export const Visitors = db.define('visitors',{
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    post:{
        type: DataTypes.STRING
    },
    depart:{
        type: DataTypes.STRING
    },
    type:{
        type: DataTypes.STRING
    },
    gate:{
        type: DataTypes.STRING
    },
    time:{
        type: DataTypes.STRING
    },
    date:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});


