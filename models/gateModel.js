import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const GateData = db.define('gates',{
    gateId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    faceregId:{
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING
    },
    IPaddress:{
        type: DataTypes.STRING
    },
    companyId:{
        type: DataTypes.INTEGER
    },
    objectId:{
        type: DataTypes.INTEGER
    },
    objectName:{
        type: DataTypes.STRING
    },
    placeId:{
        type: DataTypes.INTEGER
    },
    place:{
        type: DataTypes.STRING
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
 
export default GateData;