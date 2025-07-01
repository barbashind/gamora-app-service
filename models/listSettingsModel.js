import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;

 
export const Service = db.define('services',{
    serviceCode:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    serviceName:{
        type: DataTypes.STRING
    },
    companyId:{
        type: DataTypes.INTEGER,
    },
    defaultPrice:{
        type: DataTypes.INTEGER,
    },
    isHourly :{
        type: DataTypes.BOOLEAN,
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    },

},{
    freezeTableName: true
});
 

export const Furniture = db.define('furnitures',{
    furnitureCode:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    furnitureName:{
        type: DataTypes.STRING
    },
    companyId:{
        type: DataTypes.INTEGER,
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    },

},{
    freezeTableName: true
});

export const Equipment = db.define('equipments',{
    equipmentCode:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    equipmentName:{
        type: DataTypes.STRING
    },
    companyId:{
        type: DataTypes.INTEGER,
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    },

},{
    freezeTableName: true
});