import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;

const Images = db.define('images',{
    documentId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    loftId:{
        type: DataTypes.INTEGER
    },
    fileName:{
        type: DataTypes.STRING
    },
    fileMimeType:{
        type: DataTypes.STRING
    },
    fileSize:{
        type: DataTypes.STRING
    },
    fileExtension:{
        type: DataTypes.STRING
    },
    path:{
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
 
export default Images;