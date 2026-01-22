import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Monitoring = db.define('monitoring',{
    pointId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    login:{
        type: DataTypes.STRING,
    },
    object:{
        type: DataTypes.STRING,
    },
    place:{
        type: DataTypes.STRING,
    },
    responsible: {
        type: DataTypes.STRING,
    },
    responsibleObjNumber: {
        type: DataTypes.STRING,
    },
    responsibleObj: {
        type: DataTypes.STRING,
    },
    IPadress: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    comment: {
        type: DataTypes.STRING,
    },
    faceRegGUID: {
        type: DataTypes.STRING,
    },
    server: {
        type: DataTypes.STRING,
    },
    admPageLink: {
        type: DataTypes.STRING,
    },
    connecting: {
        type: DataTypes.BOOLEAN,
    },
    type: {
        type: DataTypes.STRING,
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
 
export default Monitoring;