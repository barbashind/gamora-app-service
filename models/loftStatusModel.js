import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const LoftStatus = db.define('lofts',{
    loftId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyId:{
        type: DataTypes.INTEGER,
    },
    commonData:{
        type: DataTypes.BOOLEAN
    },
    mediaData:{
        type: DataTypes.BOOLEAN
    },
    timepriceData:{
        type: DataTypes.BOOLEAN
    },
    equipmentData:{
        type: DataTypes.BOOLEAN
    },
    serviceData:{
        type: DataTypes.BOOLEAN
    },
    valid:{
        type: DataTypes.BOOLEAN
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
 
export default LoftStatus;